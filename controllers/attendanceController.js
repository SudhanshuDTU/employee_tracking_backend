import * as attendanceModel from '../models/attendanceModel.js';
import * as warehouseModel from "../models/warehouseModel.js"
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await attendanceModel.getAllAttendance();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await attendanceModel.getAttendanceById(id);
    if (attendance) {
      res.status(200).json(attendance);
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAttendanceByUserId = async (req, res) => {
  const { id } = req.params;
  console.log(`check here ${id}`);
  try {
    const attendance = await attendanceModel.getAttendanceByUserId(id);
    if (attendance) {
      res.status(200).json(attendance);
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAttendance = async (req, res) => {
  const attendance = req.body;
  try {
    const newAttendance = await attendanceModel.createAttendance(attendance);
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const attendance = req.body;
  try {
    const updatedAttendance = await attendanceModel.updateAttendance(id, attendance);
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    await attendanceModel.deleteAttendance(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Distance in meters
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};



export const checkIn = async (req, res) => {
  const { user_id, warehouse_id, latitude, longitude } = req.body;
  console.log("here i m ");
  console.log(`req body data ${req.body}`);
  try {
    const warehouse = await warehouseModel.getWarehouseById(warehouse_id);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    const distance = calculateDistance(
      warehouse.latitude,
      warehouse.longitude,
      latitude,
      longitude
    );

    

    const attendance = {
      user_id,
      warehouse_id,
      check_in_time: new Date(),
      check_in_latitude: latitude,
      check_in_longitude: longitude,
      status: 'checked_in',
    };

    const newAttendance = await attendanceModel.createAttendance(attendance);
    res.status(201).json(newAttendance);
    console.log("here i m  @2");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkOut = async (req, res) => {
  const { id, latitude, longitude,total_distance} = req.body;

  try {
    const attendance = await attendanceModel.getAttendanceById(id);
    if (!attendance || attendance.status === 'checked_out') {
      return res.status(400).json({ error: 'Invalid check-out request' });
    }

    // // Calculate total distance traveled
    // const distanceTraveled = calculateDistance(
    //   attendance.check_in_latitude,
    //   attendance.check_in_longitude,
    //   latitude,
    //   longitude
    // );
    // Update attendance record
    const existingBreakIds = attendance.breakids;
    const existingBreakStatus = attendance.break_status;
    const updatedAttendance = {
      ...attendance,
      check_out_time: new Date(),
      check_out_latitude: latitude,
      check_out_longitude: longitude,
      total_distance: total_distance,
      status: 'present'
    };

    await attendanceModel.updateAttendance(id, updatedAttendance);
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBreakInAttendance = async (req, res) => {
  const { id,break_status, break_id} = req.body;

  try {
    const attendance = await attendanceModel.getAttendanceById(id);
    if (!attendance || attendance.status === 'checked_out') {
      return res.status(400).json({ error: 'Invalid break update request' });
    }
    const existingBreakIds = attendance.breakids || [];
    const updatedBreakIds = [...existingBreakIds, break_id];
    const updatedAttendance = {
      ...attendance,
      break_status: break_status,
      breakids: updatedBreakIds,
    };

    await attendanceModel.updateAttendance(id, updatedAttendance);
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Location related

export const handleLocationUpdate = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;

    if (!userId || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedAttendance = await attendanceModel.updateLocationAndDistance(userId, latitude, longitude);

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'No active check-in found' });
    }

    return res.status(200).json({ message: 'Location updated', updatedAttendance });
  } catch (err) {
    console.error('Error in handleLocationUpdate:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
