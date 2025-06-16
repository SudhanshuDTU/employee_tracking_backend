import fetch from 'node-fetch';
import cron from 'node-cron';
import pkg from 'pg';
import pool from '../config/db.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

const formatTime = (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');

const holidays = [
  '2025-01-26', // Republic Day
  '2025-03-14', // Holi
  '2025-08-15', // Independence Day
  '2025-10-02', // Gandhi Jayanti
  '2025-10-21', // Dussehra
  '2025-10-30', // Diwali
  '2025-11-07', // Rakshabandhan
  '2025-12-25', // Christmas
];

cron.schedule('45 23 * * *', async () => {
    try {
      const today = dayjs().format('YYYY-MM-DD');
  
      // Fetch all users
      const usersRes = await fetch('https://employee-tracking-backend.onrender.com/api/users');
      const users = await usersRes.json();
  
      // Fetch all attendance
      const attRes = await fetch('https://employee-tracking-backend.onrender.com/api/attendance/');
      const allAttendance = await attRes.json();
  
      for (const user of users) {
        const userId = user.id;
  
        // Filter all today's records of this user
        const userTodayAttendance = allAttendance.filter((a) => {
          const checkIn = dayjs(a.check_in_time);
          return a.user_id === userId && checkIn.isSame(today, 'day');
        });
  
        // CASE 1: No attendance
        if (userTodayAttendance.length === 0) {

           if(holidays.includes(today)){

            const checkInTime = dayjs(`${today} 00:00:00`).toISOString();
  
            const payload = {
              user_id: userId,
              warehouse_id: 0,
              check_in_time: checkInTime,
              check_in_latitude: 0.0,
              check_in_longitude: 0.0,
              status: 'holiday',
            };
    
            await fetch('https://employee-tracking-backend.onrender.com/api/attendance', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
    
            console.log(`User ${userId} marked holiday`);
           } else{
            const checkInTime = dayjs(`${today} 00:00:00`).toISOString();
  
            const payload = {
              user_id: userId,
              warehouse_id: 0,
              check_in_time: checkInTime,
              check_in_latitude: 0.0,
              check_in_longitude: 0.0,
              status: 'absent',
            };
    
            await fetch('https://employee-tracking-backend.onrender.com/api/attendance', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
    
            console.log(`User ${userId} marked absent (no attendance)`);
           }
          
        } else {
          // CASE 2: Has records – calculate total duration
          let totalMinutes = 0;
  
          for (const record of userTodayAttendance) {
            const checkIn = dayjs(record.check_in_time);
            const checkOut = dayjs(record.check_out_time);
  
            if (checkIn.isValid() && checkOut.isValid()) {
              totalMinutes += checkOut.diff(checkIn, 'minute');
            }
          }
  
          let finalStatus = 'absent';
          if (totalMinutes >= 470) {
            finalStatus = 'present';
          } else if (totalMinutes >= 240) {
            finalStatus = 'halfday';
          }
  
          // Update all of today's records with the computed status
          for (const record of userTodayAttendance) {
            const updatedAttendancePayload = {
              user_id: record.user_id,
              warehouse_id: record.warehouse_id,
              check_in_time: record.check_in_time,
              check_in_latitude: record.check_in_latitude,
              check_in_longitude: record.check_in_longitude,
              check_out_time: record.check_out_time,
              check_out_latitude: record.check_out_latitude,
              check_out_longitude: record.check_out_longitude,
              total_distance: record.total_distance,
              status: finalStatus,
              break_status: record.break_status,
              breakids: record.breakids,
            };
  
            await fetch(`https://employee-tracking-backend.onrender.com/api/attendance/${record.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedAttendancePayload),
            });
  
            console.log(`User ${userId} record ${record.id} updated to ${finalStatus}`);
          }
        }
      }
    } catch (err) {
      console.error('Cron Job Error:', err.message);
    }
  });
  