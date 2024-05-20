export const productRoleMap: Record<string, { id: string; name: string }[]> =
  process.env.ENV === 'dev'
    ? {
        prod_Q8qLskAqK9HTo8: [{ id: '1229468577279770755', name: 'VIP' }],
        prod_PiwzLgsemmCJ18: [{ id: '1229468577279770755', name: 'VIP' }],
        prod_Q7j3Vx68kflDV3: [{ id: '1229468577279770755', name: 'VIP' }],
        prod_Q7j4DjrPMOQgyJ: [{ id: '1229468577279770755', name: 'VIP' }],
      }
    : {
        prod_PiwzLgsemmCJ18: [{ id: '1229468577279770755', name: 'VIP' }],
        prod_Q7j3Vx68kflDV3: [{ id: '1229468577279770755', name: 'VIP' }],
        prod_Q7j4DjrPMOQgyJ: [{ id: '1229468577279770755', name: 'VIP' }],
      };
