export const assets = [
  { id: 1, name: "Dell Laptop", type: "Laptop", status: "Assigned", employee: "Alfiya" },
  { id: 2, name: "HP Monitor", type: "Monitor", status: "Available", employee: null }
];

export const inventory = [
  { id: 1, item: "HDMI Cable", quantity: 3, threshold: 5 },
  { id: 2, item: "Mouse", quantity: 10, threshold: 5 }
];

export const assignments = [
  { id: 1, asset: "Dell Laptop", employee: "Alfiya", assigned: "2026-04-10", returned: "-" }
];

export const tickets = [
  {
    id: 1,
    asset: "Dell Laptop",
    issue: "Screen issue",
    employee: "Alfiya",
    status: "In Progress"
  }
];