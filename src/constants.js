export const MOCK_STATS = {
  totalPatients: 12840,
  activeDoctors: 48,
  appointmentsToday: 156,
  revenue: 84200,
  revenueGain: 12.5,
  patientGain: 8.2,
};

export const MOCK_USERS = [
  { id: '1', name: 'Dr. Sara khan', email: 'sara.w@nexacare.com', role: 'Doctor', status: 'active', lastActive: '2 mins ago' },
  { id: '2', name: 'Dr. Manoj Bajpayee', email: 'manoj@nexacare.com', role: 'Admin', status: 'active', lastActive: '10 mins ago' },
  { id: '3', name: 'Nurse sona', email: 'sona.b@nexacare.com', role: 'Nurse', status: 'active', lastActive: '1 hour ago' },
  { id: '4', name: 'Dr. Vijay S', email: 'vijay@nexacare.com', role: 'Doctor', status: 'inactive', lastActive: '2 days ago' },
];

export const MOCK_PATIENTS = [
  { id: 'P001', name: 'Vivek Mahajan', age: 28, gender: 'Male', bloodGroup: 'O+', lastVisit: '2024-03-22', condition: 'Hypertension', phone: '+1 234-567-8901', email: 'alice.j@example.com' },
  { id: 'P002', name: 'Rajan Kawadkar', age: 45, gender: 'Male', bloodGroup: 'A-', lastVisit: '2024-03-25', condition: 'Diabetes Type 2', phone: '+1 234-567-8902', email: 'm.chen@example.com' },
  { id: 'P003', name: 'Manoj Khandelkar', age: 34, gender: 'Male', bloodGroup: 'B+', lastVisit: '2024-03-20', condition: 'Asthma', phone: '+1 234-567-8903', email: 'sophia.m@example.com' },
];

export const MOCK_APPOINTMENTS = [
  { id: 'A001', patientId: 'P001', patientName: 'Shivdas Mahajan', doctorId: '1', doctorName: 'Dr. Sara Khan', date: '2024-04-30', time: '09:00 AM', status: 'Scheduled', type: 'General Checkup' },
  { id: 'A002', patientId: 'P002', patientName: 'Shubham Patil', doctorId: '1', doctorName: 'Dr. Pankaj Tripathi', date: '2024-04-30', time: '10:30 AM', status: 'Pending', type: 'Urgent' },
  { id: 'A003', patientId: 'P003', patientName: 'Aditya Shukla', doctorId: '4', doctorName: 'Dr. David Miller', date: '2024-05-01', time: '02:00 PM', status: 'Scheduled', type: 'Follow-up' },
];

export const REVENUE_DATA = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
];

