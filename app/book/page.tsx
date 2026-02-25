export const metadata = {
  title: "Book a Call",
  description: "Schedule a funding strategy call.",
};

const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1MAmpY8U8XVGe-jtkzKkPnCDWKYqIvKsUoiGCDoWC3OIsJRTeeh7NMNPfWir7ht3rI7-AQ4wMM?gv=true";

export default function BookPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Book a Call</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Pick a time that works. This uses Google Calendar Appointment Scheduling.
      </p>

      <div className="mt-8 rounded-3xl border border-border/60 overflow-hidden bg-black">
        <iframe
          src={BOOKING_URL}
          style={{ border: 0 }}
          width="100%"
          height="700"
          frameBorder={0}
          title="Book a call"
        />
      </div>
    </main>
  );
}
