import { 
  Settings, 
  Stethoscope, 
  ListOrdered,
  LayoutDashboard,
  CalendarDays,
  FileText
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'doctors', icon: Stethoscope, label: 'Find Doctors' },
  { id: 'appointments', icon: CalendarDays, label: 'Appointments' },
  { id: 'queue', icon: ListOrdered, label: 'Live Queue' },
  { id: 'records', icon: FileText, label: 'Medical Records' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const MOCK_DOCTORS = [
  {
    id: 'd1',
    name: 'Dr. Ananya Sharma',
    specialty: 'Cardiologist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.9,
    reviews: 124,
    education: 'AIIMS, New Delhi',
    experience: '12 Years',
    availability: [
      { day: 'Monday', slots: [
        { id: 's1', time: '09:00 AM', isBooked: false },
        { id: 's2', time: '10:00 AM', isBooked: true },
        { id: 's3', time: '11:00 AM', isBooked: false },
      ]},
    ]
  },
  {
    id: 'd2',
    name: 'Dr. Vikram Malhotra',
    specialty: 'Neurologist',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.8,
    reviews: 89,
    education: 'Armed Forces Medical College',
    experience: '15 Years',
    availability: [
      { day: 'Monday', slots: [
        { id: 's4', time: '02:00 PM', isBooked: false },
        { id: 's5', time: '03:00 PM', isBooked: false },
      ]},
    ]
  },
  {
    id: 'd3',
    name: 'Dr. Priya Iyer',
    specialty: 'Pediatrician',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.7,
    reviews: 156,
    education: 'Maulana Azad Medical College',
    experience: '8 Years',
    availability: [
      { day: 'Monday', slots: [
        { id: 's6', time: '10:00 AM', isBooked: false },
        { id: 's7', time: '11:00 AM', isBooked: false },
      ]},
    ]
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 'a1',
    doctorId: 'd1',
    doctorName: 'Dr. Ananya Sharma',
    doctorSpecialty: 'Cardiologist',
    patientId: 'P-1024',
    patientName: 'John Doe',
    date: '2023-10-12',
    time: '10:00 AM',
    status: 'SCHEDULED',
    token: 12,
    type: 'CONSULTATION',
    reason: 'Regular heart checkup'
  },
  {
    id: 'a2',
    doctorId: 'd2',
    doctorName: 'Dr. Vikram Malhotra',
    doctorSpecialty: 'Neurologist',
    patientId: 'P-1024',
    patientName: 'John Doe',
    date: '2023-10-15',
    time: '02:30 PM',
    status: 'SCHEDULED',
    token: 5,
    type: 'FOLLOW_UP',
    reason: 'Post-migraine review'
  },
  {
    id: 'a3',
    doctorId: 'd3',
    doctorName: 'Dr. Priya Iyer',
    doctorSpecialty: 'Pediatrician',
    patientId: 'P-1024',
    patientName: 'John Doe',
    date: '2023-10-08',
    time: '11:00 AM',
    status: 'COMPLETED',
    token: 18,
    type: 'EMERGENCY',
    reason: 'High fever check'
  }
];

