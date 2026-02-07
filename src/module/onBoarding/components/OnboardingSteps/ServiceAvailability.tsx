// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Clock, Copy, Check, Settings, RotateCcw } from 'lucide-react';
// import { cn } from '@/lib/utils'; // assuming you have a cn utility (class-variance-authority or similar)

// type StepAccountProps = {
//   onNext: () => void;
//   onBack: () => void;
// };

// type DaySchedule = {
//   open: string;
//   close: string;
//   isClosed: boolean;
// };

// type WeekSchedule = {
//   [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: DaySchedule;
// };

// const dayOrder = [
//   'monday',
//   'tuesday',
//   'wednesday',
//   'thursday',
//   'friday',
//   'saturday',
//   'sunday',
// ] as const;

// const dayLabels: Record<typeof dayOrder[number], string> = {
//   monday: 'Monday',
//   tuesday: 'Tuesday',
//   wednesday: 'Wednesday',
//   thursday: 'Thursday',
//   friday: 'Friday',
//   saturday: 'Saturday',
//   sunday: 'Sunday',
// };

// const defaultOpenHours = '09:00';
// const defaultCloseHours = '17:00';
// const weekendOpenHours = '10:00';
// const weekendCloseHours = '14:00';

// const initialSchedule: WeekSchedule = {
//   monday: { open: defaultOpenHours, close: defaultCloseHours, isClosed: false },
//   tuesday: { open: defaultOpenHours, close: defaultCloseHours, isClosed: false },
//   wednesday: { open: defaultOpenHours, close: defaultCloseHours, isClosed: false },
//   thursday: { open: defaultOpenHours, close: defaultCloseHours, isClosed: false },
//   friday: { open: defaultOpenHours, close: defaultCloseHours, isClosed: false },
//   saturday: { open: weekendOpenHours, close: weekendCloseHours, isClosed: false },
//   sunday: { open: '', close: '', isClosed: true },
// };

// const formatTimeTo12Hour = (time: string): string => {
//   if (!time) return '';
//   const [hours, minutes] = time.split(':').map(Number);
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const hour12 = hours % 12 || 12;
//   return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
// };

// const getTimeDisplay = (day: DaySchedule): string => {
//   if (day.isClosed) return 'Closed';
//   if (!day.open || !day.close) return 'Not set';
//   return `${formatTimeTo12Hour(day.open)} – ${formatTimeTo12Hour(day.close)}`;
// };

// const timeToMinutes = (time: string): number => {
//   if (!time) return -1;
//   const [h, m] = time.split(':').map(Number);
//   return h * 60 + m;
// };

// const isValidDaySchedule = (schedule: DaySchedule): boolean => {
//   if (schedule.isClosed) return true;
//   const openMin = timeToMinutes(schedule.open);
//   const closeMin = timeToMinutes(schedule.close);
//   return openMin !== -1 && closeMin !== -1 && openMin < closeMin;
// };

// function TimeInputGroup({
//   label,
//   value,
//   onChange,
//   disabled,
// }: {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   disabled: boolean;
// }) {
//   return (
//     <div className="space-y-2">
//       <Label className="text-sm font-medium">{label}</Label>
//       <div className="flex items-center gap-2">
//         <Input
//           type="time"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           disabled={disabled}
//           className="flex-1"
//         />
//         <Button
//           variant="outline"
//           size="sm"
//           className="h-9 text-xs"
//           disabled={disabled}
//           onClick={() => onChange('09:00')}
//         >
//           9 AM
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           className="h-9 text-xs"
//           disabled={disabled}
//           onClick={() => onChange('10:00')}
//         >
//           10 AM
//         </Button>
//       </div>
//     </div>
//   );
// }

// function DayCard({
//   day,
//   schedule,
//   onToggleClosed,
//   onTimeChange,
//   onCopyToAll,
//   isCopied,
// }: {
//   day: keyof WeekSchedule;
//   schedule: DaySchedule;
//   onToggleClosed: () => void;
//   onTimeChange: (field: 'open' | 'close', value: string) => void;
//   onCopyToAll: () => void;
//   isCopied: boolean;
// }) {
//   const openMin = timeToMinutes(schedule.open);
//   const closeMin = timeToMinutes(schedule.close);
//   let errorMessage: string | null = null;

//   if (!schedule.isClosed) {
//     if (openMin === -1 || closeMin === -1) {
//       errorMessage = 'Please set both opening and closing times.';
//     } else if (openMin >= closeMin) {
//       errorMessage = 'Opening time must be before closing time.';
//     }
//   }

//   return (
//     <div
//       className={cn(
//         'border rounded-xl p-5 transition-all',
//         schedule.isClosed
//           ? 'bg-muted/40 border-muted'
//           : 'bg-card shadow-sm hover:shadow',
//         errorMessage && 'border-red-500'
//       )}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <h3 className="font-semibold text-lg">{dayLabels[day]}</h3>
//           <span
//             className={cn(
//               'px-2.5 py-1 text-xs font-medium rounded-full',
//               schedule.isClosed
//                 ? 'bg-red-100 text-red-800'
//                 : 'bg-green-100 text-green-800'
//             )}
//           >
//             {schedule.isClosed ? 'CLOSED' : 'OPEN'}
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8"
//             onClick={onCopyToAll}
//             disabled={isCopied}
//             title="Copy to all days"
//           >
//             {isCopied ? (
//               <Check className="h-4 w-4 text-green-600" />
//             ) : (
//               <Copy className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//       </div>

//       <div className={cn('space-y-5', schedule.isClosed && 'opacity-50 pointer-events-none')}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <TimeInputGroup
//             label="Opening Time"
//             value={schedule.open}
//             onChange={(v) => onTimeChange('open', v)}
//             disabled={schedule.isClosed}
//           />
//           <TimeInputGroup
//             label="Closing Time"
//             value={schedule.close}
//             onChange={(v) => onTimeChange('close', v)}
//             disabled={schedule.isClosed}
//           />
//         </div>

//         {errorMessage && (
//           <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
//         )}

//         <Button
//           variant={schedule.isClosed ? 'default' : 'outline'}
//           size="sm"
//           onClick={onToggleClosed}
//           className="w-full sm:w-auto"
//         >
//           {schedule.isClosed ? 'Open this day' : 'Close this day'}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default function ServiceAvailability({ onNext, onBack }: StepAccountProps) {
//   const [schedule, setSchedule] = useState<WeekSchedule>(initialSchedule);
//   const [copiedDay, setCopiedDay] = useState<keyof WeekSchedule | null>(null);
//   const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

//   const updateDay = (day: keyof WeekSchedule, updates: Partial<DaySchedule>) => {
//     setSchedule((prev) => ({
//       ...prev,
//       [day]: { ...prev[day], ...updates },
//     }));
//   };

//   const handleTimeChange = (day: keyof WeekSchedule, field: 'open' | 'close', value: string) => {
//     updateDay(day, { [field]: value });
//   };

//   const handleToggleDay = (day: keyof WeekSchedule) => {
//     setSchedule((prev) => {
//       const current = prev[day];
//       const wasClosed = current.isClosed;

//       return {
//         ...prev,
//         [day]: {
//           ...current,
//           isClosed: !wasClosed,
//           ...(wasClosed && !current.open && !current.close
//             ? { open: defaultOpenHours, close: defaultCloseHours }
//             : {}),
//         },
//       };
//     });
//   };

//   const copyToAll = (sourceDay: keyof WeekSchedule) => {
//     const source = schedule[sourceDay];
//     const newSchedule = { ...schedule };
//     dayOrder.forEach((day) => {
//       if (day !== sourceDay) {
//         newSchedule[day] = { ...source };
//       }
//     });
//     setSchedule(newSchedule);
//     setCopiedDay(sourceDay);
//     setTimeout(() => setCopiedDay(null), 1800);
//   };

//   const applyToWeekdays = () => {
//     const source = schedule.monday;
//     setSchedule((prev) => ({
//       ...prev,
//       tuesday: { ...source },
//       wednesday: { ...source },
//       thursday: { ...source },
//       friday: { ...source },
//     }));
//   };

//   const applyToWeekends = () => {
//     const source = schedule.saturday;
//     setSchedule((prev) => ({
//       ...prev,
//       sunday: { ...source },
//     }));
//   };

//   const setAllOpen = () => {
//     setSchedule((prev) => {
//       const next = { ...prev };
//       dayOrder.forEach((day) => {
//         next[day] = {
//           open: day === 'saturday' || day === 'sunday' ? weekendOpenHours : defaultOpenHours,
//           close: day === 'saturday' || day === 'sunday' ? weekendCloseHours : defaultCloseHours,
//           isClosed: false,
//         };
//       });
//       return next;
//     });
//   };

//   const setAllClosed = () => {
//     setSchedule((prev) => {
//       const next = { ...prev };
//       dayOrder.forEach((day) => {
//         next[day] = { open: '', close: '', isClosed: true };
//       });
//       return next;
//     });
//   };

//   const resetToInitial = () => {
//     setSchedule(initialSchedule);
//   };

//   const openDays = dayOrder.filter((day) => !schedule[day].isClosed).length;
//   const invalidConfigs = dayOrder.reduce((count, day) => {
//     return isValidDaySchedule(schedule[day]) ? count : count + 1;
//   }, 0);
//   const isValid = openDays > 0 && invalidConfigs === 0;

//   return (
//     <Card className="w-full max-w-4xl mx-auto border shadow-sm">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-xl">
//           <Clock className="h-5 w-5" />
//           Service Availability
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">
//           Define when your business is available for bookings. Customers will only see available slots.
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-6 pt-2">
//         {/* Quick Actions */}
//         <div className="bg-muted/50 rounded-xl p-5 border">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//             <h3 className="font-medium flex items-center gap-2">
//               <Settings className="h-4 w-4" />
//               Quick Setup
//             </h3>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setViewMode(viewMode === 'daily' ? 'weekly' : 'daily')}
//             >
//               {viewMode === 'daily' ? 'Switch to Weekly Grid' : 'Switch to Detailed View'}
//             </Button>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <Button variant="outline" size="sm" onClick={applyToWeekdays}>
//               Copy Mon–Fri
//             </Button>
//             <Button variant="outline" size="sm" onClick={applyToWeekends}>
//               Copy Sat–Sun
//             </Button>
//             <Button variant="outline" size="sm" onClick={setAllOpen}>
//               Open All Days
//             </Button>
//             <Button variant="outline" size="sm" onClick={setAllClosed}>
//               Close All Days
//             </Button>
//             <Button variant="ghost" size="sm" onClick={resetToInitial}>
//               <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
//               Reset
//             </Button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-green-50/70 border border-green-200 rounded-xl p-4">
//             <div className="text-sm font-medium text-green-800">Open Days</div>
//             <div className="text-3xl font-bold text-green-700 mt-1">{openDays}</div>
//           </div>
//           <div className="bg-red-50/70 border border-red-200 rounded-xl p-4">
//             <div className="text-sm font-medium text-red-800">Closed Days</div>
//             <div className="text-3xl font-bold text-red-700 mt-1">{7 - openDays}</div>
//           </div>
//         </div>

//         {viewMode === 'daily' ? (
//           <div className="space-y-4">
//             {dayOrder.map((day) => (
//               <DayCard
//                 key={day}
//                 day={day}
//                 schedule={schedule[day]}
//                 onToggleClosed={() => handleToggleDay(day)}
//                 onTimeChange={(field, value) => handleTimeChange(day, field, value)}
//                 onCopyToAll={() => copyToAll(day)}
//                 isCopied={copiedDay === day}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
//             {dayOrder.map((day) => {
//               const s = schedule[day];
//               return (
//                 <button
//                   key={day}
//                   type="button"
//                   onClick={() => handleToggleDay(day)}
//                   className={cn(
//                     'border rounded-lg p-3 text-center transition-all hover:ring-2 hover:ring-primary/40 focus:outline-none focus:ring-2 focus:ring-primary',
//                     s.isClosed
//                       ? 'bg-red-50 border-red-200 hover:bg-red-100'
//                       : 'bg-green-50 border-green-200 hover:bg-green-100',
//                     !isValidDaySchedule(s) && 'border-red-500'
//                   )}
//                   aria-label={`Toggle ${dayLabels[day]} ${s.isClosed ? 'open' : 'closed'}`}
//                 >
//                   <div className="font-medium text-sm mb-1">{dayLabels[day].slice(0, 3)}</div>
//                   <div
//                     className={cn(
//                       'text-xs px-2.5 py-1 rounded-full font-medium mx-auto w-fit mb-2',
//                       s.isClosed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//                     )}
//                   >
//                     {s.isClosed ? 'Closed' : 'Open'}
//                   </div>
//                   <div className="text-xs text-muted-foreground">
//                     {getTimeDisplay(s)}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {/* Summary (compact version) */}
//         <div className="border rounded-xl overflow-hidden">
//           <div className="bg-muted/60 px-4 py-3">
//             <h4 className="font-medium">Summary</h4>
//           </div>
//           <div className="divide-y">
//             {dayOrder.map((day) => {
//               const s = schedule[day];
//               return (
//                 <div
//                   key={day}
//                   className="flex items-center justify-between px-4 py-3 hover:bg-muted/40"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={cn(
//                         'w-2.5 h-2.5 rounded-full',
//                         s.isClosed ? 'bg-red-500' : 'bg-green-500',
//                         !isValidDaySchedule(s) && !s.isClosed && 'bg-yellow-500'
//                       )}
//                     />
//                     <span className="font-medium">{dayLabels[day]}</span>
//                   </div>
//                   <div className="flex items-center gap-4 text-sm">
//                     <span className={cn(s.isClosed ? 'text-red-600' : 'text-green-700 font-medium')}>
//                       {getTimeDisplay(s)}
//                     </span>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleToggleDay(day)}
//                     >
//                       {s.isClosed ? 'Open' : 'Close'}
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </CardContent>

//       <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
//         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//           <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
//             Back
//           </Button>
//           <Button
//             variant="outline"
//             onClick={resetToInitial}
//             className="w-full sm:w-auto"
//           >
//             Reset All
//           </Button>
//         </div>

//         <div className="flex items-center gap-4 w-full sm:w-auto">
//           <div className="text-sm text-muted-foreground whitespace-nowrap">
//             {openDays} day{openDays !== 1 ? 's' : ''} open
//             {invalidConfigs > 0 && (
//               <span className="text-red-500 ml-2">({invalidConfigs} invalid)</span>
//             )}
//           </div>
//           <Button
//             onClick={onNext}
//             disabled={!isValid}
//             className="w-full sm:w-auto"
//             size="lg"
//           >
//             Continue
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }






'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type DayAvailability = {
  enabled: boolean;
  open: string;
  close: string;
};

const ServiceAvailability = ({ onNext, onBack }: StepAccountProps) => {
  const [availability, setAvailability] = useState<
    Record<string, DayAvailability>
  >(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { enabled: false, open: '', close: '' };
      return acc;
    }, {} as Record<string, DayAvailability>)
  );

  const handleChange = (
    day: string,
    field: keyof DayAvailability,
    value: boolean | string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Availability</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill the time the restaurant is available for booking.
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-4">

        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
          >
            {/* Checkbox */}
            <div className="flex items-center gap-2 w-32">
              <Checkbox
                checked={availability[day].enabled}
                onCheckedChange={(checked) =>
                  handleChange(day, 'enabled', Boolean(checked))
                }
              />
              <span className="font-medium">{day}</span>
            </div>

            {/* Open Time */}
            <Input
              type="time"
              disabled={!availability[day].enabled}
              value={availability[day].open}
              onChange={(e) =>
                handleChange(day, 'open', e.target.value)
              }
              placeholder="Open"
            />

            {/* Close Time */}
            <Input
              type="time"
              disabled={!availability[day].enabled}
              value={availability[day].close}
              onChange={(e) =>
                handleChange(day, 'close', e.target.value)
              }
              placeholder="Close"
            />
          </div>
        ))}

      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-between">
        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          className="w-full sm:w-auto"
          onClick={onNext}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceAvailability;

