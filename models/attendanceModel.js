import pool from '../config/db.js';

const haversine = (coord1, coord2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000; // Radius of Earth in meters
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

export const getAllAttendance = async () => {
  const query = 'SELECT * FROM "Attendance"';
  const result = await pool.query(query);
  return result.rows;
};

export const getAttendanceById = async (id) => {
  const query = 'SELECT * FROM "Attendance" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getAttendanceByUserId = async (id) => {
  const query = 'SELECT * FROM "Attendance" WHERE user_id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};

export const createAttendance = async (attendance) => {
  console.log("here i m @3");
  const query =
    'INSERT INTO "Attendance" (user_id, warehouse_id, check_in_time, check_in_latitude, check_in_longitude, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [
    attendance.user_id,
    attendance.warehouse_id,
    attendance.check_in_time,
    attendance.check_in_latitude,
    attendance.check_in_longitude,
    attendance.status,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateAttendance = async (id, attendance) => {
  const query =
    'UPDATE "Attendance" SET user_id = $1, warehouse_id = $2, check_in_time = $3, check_in_latitude = $4, check_in_longitude = $5, check_out_time = $6, check_out_latitude = $7, check_out_longitude = $8, total_distance = $9, status = $10, break_status = $11,breakids = $12 WHERE id = $13 RETURNING *';
  const values = [
    attendance.user_id,
    attendance.warehouse_id,
    attendance.check_in_time,
    attendance.check_in_latitude,
    attendance.check_in_longitude,
    attendance.check_out_time,
    attendance.check_out_latitude,
    attendance.check_out_longitude,
    attendance.total_distance,
    attendance.status,
    attendance.break_status,
    attendance.breakids,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};


export const deleteAttendance = async (id) => {
  const query = 'DELETE FROM "Attendance" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};

// Location update

export const updateLocationAndDistance = async (userId, latitude, longitude) => {
  // Get today's active attendance for this user
  const query = `
    SELECT * FROM "Attendance"
    WHERE user_id = $1 AND status = 'checked_in'
    ORDER BY check_in_time DESC
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [userId]);
  if (rows.length === 0) return null;

  const attendance = rows[0];

  // Get last known location from DB (store these in new columns)
  const lastLat = attendance?.last_latitude;
  const lastLng = attendance?.last_longitude;

// 1. Fetch warehouse info
  const warehouseQuery = `SELECT * FROM "Warehouse" WHERE id = $1`;
  const warehouseRes = await pool.query(warehouseQuery, [attendance.warehouse_id]);
  if (warehouseRes.rows.length === 0) return null;

  const warehouse = warehouseRes.rows[0];
  // 2. Calculate distance from current location to warehouse center
  const distFromWarehouse = haversine(
    { lat: warehouse.latitude, lon: warehouse.longitude },
    { lat: latitude, lon: longitude }
  );
  if (distFromWarehouse > warehouse.radius) {
    console.log('User is outside the warehouse radius.');
    return null;
  }

  // 3. Check break status
  const breakIds = attendance.breakids || [];
  const lastBreakId = breakIds[breakIds.length - 1];
  if (lastBreakId) {
    const breakQuery = `SELECT * FROM "Breaks" WHERE id = $1`;
    const breakRes = await pool.query(breakQuery, [lastBreakId]);
    const breakRecord = breakRes.rows[0];

    // If break_end_time is null => user is currently on break
    if (!breakRecord?.break_end_time) {
      console.log('User is currently on a break.');
      return null;
    }
  }

  
  let newDistance = parseFloat(attendance.total_distance) || 0;
  const MOVEMENT_THRESHOLD_METERS = 15;
  // Calculate new distance only if lastLat/lng exist
  if (lastLat && lastLng) {
    const dist = haversine(
      { lat: lastLat, lon: lastLng },
      { lat: latitude, lon: longitude }
    );
    if (dist >= MOVEMENT_THRESHOLD_METERS) {
      newDistance += dist;
      console.log(`Added distance: ${dist.toFixed(2)} meters`);
    } else {
      console.log(`Ignored small movement: ${dist.toFixed(2)} meters`);
    }
  }
   console.log(`total distance is ${newDistance}`);

  // Update Attendance row
  const updateQuery = `
    UPDATE "Attendance"
    SET last_latitude = $1,
        last_longitude = $2,
        total_distance = $3
    WHERE id = $4
    RETURNING *
  `;

  const values = [latitude, longitude, newDistance, attendance.id];
  const result = await pool.query(updateQuery, values);
    console.log(`new updated att values are ${result.rows[0]}`);

  return result.rows[0];
};
