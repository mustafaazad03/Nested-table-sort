export const data = [
  { 
    id: 1, 
    customerName: 'Customer A', 
    range30: 100, 
    rane60: 200, 
    rane90: 300, 
    total: 600,
    children: [
      { 
        poNumber: 1, 
        customerName: 'POA123', 
        range30: 50, 
        rane60: 100, 
        rane90: 150, 
        total: 300,
        children: [
          { 
            invNumber: 101, 
            customerName: '101', 
            range30: 20, 
            rane60: 40, 
            rane90: 60, 
            total: 120,
            children: [
              { invNumber: 1011, customerName: '1011', range30: 10, rane60: 20, rane90: 30, total: 60 },
              { 
                invNumber: 1012, 
                customerName: '1012', 
                range30: 10, 
                rane60: 20, 
                rane90: 30, 
                total: 60,
                children: [
                  { invNumber: 10121, customerName: '10121', range30: 5, rane60: 10, rane90: 15, total: 30 },
                  { invNumber: 10122, customerName: '10122', range30: 5, rane60: 10, rane90: 15, total: 30 }
                ]
              }
            ]
          },
        ]
      },
      { poNumber: 2, customerName: 'POA456', range30: 30, rane60: 60, rane90: 90, total: 180 },
      { poNumber: 3, customerName: 'POA789', range30: 20, rane60: 40, rane90: 60, total: 120 }
    ]
  },
  { 
    id: 2, 
    customerName: 'Customer B', 
    range30: 150, 
    rane60: 250, 
    rane90: 350, 
    total: 750,
    children: [
      { poNumber: 1, customerName: 'POB123', range30: 70, rane60: 120, rane90: 160, total: 350 },
      { poNumber: 2, customerName: 'POB456', range30: 40, rane60: 80, rane90: 120, total: 240 },
      { poNumber: 3, customerName: 'POB789', range30: 40, rane60: 50, rane90: 70, total: 160 }
    ]
  },
  { 
    id: 3, 
    customerName: 'Customer C', 
    range30: 200, 
    rane60: 300, 
    rane90: 400, 
    total: 900,
    children: [
      { poNumber: 1, customerName: 'POC123', range30: 70, rane60: 120, rane90: 160, total: 350 },
      { poNumber: 2, customerName: 'POC456', range30: 80, rane60: 80, rane90: 120, total: 280 },
      { poNumber: 3, customerName: 'POC789', range30: 50, rane60: 100, rane90: 120, total: 270 }
    ]
  },
  { 
    id: 4, 
    customerName: 'Customer D', 
    range30: 250, 
    rane60: 350, 
    rane90: 450, 
    total: 1050,
    children: [
      { poNumber: 1, customerName: 'POD123', range30: 100, rane60: 150, rane90: 200, total: 450 },
      { poNumber: 2, customerName: 'POD456', range30: 80, rane60: 100, rane90: 120, total: 300 },
      { poNumber: 3, customerName: 'POD789', range30: 70, rane60: 100, rane90: 130, total: 300 }
    ]
  },
];