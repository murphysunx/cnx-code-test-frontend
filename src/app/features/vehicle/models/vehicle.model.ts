export type Vehicle = {
  _id: string;
  bac: string;
  vin: string;
  ctpStatus: string;
  onstarStatus: string;
  events: {
    _id: string;
    eventDate: string;
    eventType: string;
  }[];
  createdAt: string;
  updatedAt: string;
  make: string;
  model: string;
  telemetryPnid: string;
  color: string;
  stockNumber: string;
  year: number;
};
