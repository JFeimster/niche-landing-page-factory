"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";

type BookingDialogProps = {
  /** Button label in the header/CTA */
  triggerLabel?: string;
  /** Google Calendar Appointment Scheduling URL (the same one you use in the iframe) */
  bookingUrl: string;
  /** Optional: link to your dedicated booking page, e.g. /book */
  bookingPageHref?: string;
};

export function BookingDialog({
  triggerLabel = "Schedule a Call",
  bookingUrl,
  bookingPageHref = "/book",
}: BookingDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="xl">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Book a Funding Strategy Call</DialogTitle>
          <DialogDescription>
            Pick a time that works. This opens Google Calendar Appointment Scheduling.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="popup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popup">Popup (in-page)</TabsTrigger>
            <TabsTrigger value="inline">Inline page</TabsTrigger>
          </TabsList>

          <TabsContent value="popup" className="mt-4">
            <div className="rounded-2xl border border-border/60 overflow-hidden bg-black">
              <iframe
                src={bookingUrl}
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder={0}
                title="Book a call"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Prefer a full page? Open the booking page in a new tab.
            </p>
            <div className="mt-3">
              <Button asChild variant="secondary">
                <a href={bookingPageHref} target="_blank" rel="noreferrer">
                  Open booking page <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="inline" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Use this when you want a dedicated page (better for email links and retargeting).
            </p>
            <div className="mt-3">
              <Button asChild>
                <a href={bookingPageHref}>Go to /book</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
