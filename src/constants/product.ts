export const productRoleMap: Record<string, { id: string; name: string }[]> =
  process.env.ENV === 'dev'
    ? {
        prod_QHw7PSnt3FK8wN: [{ id: '1229468577279770755', name: 'TAG' }],
        prod_QHx9EjdbOXObG3: [{ id: '1229468577279770755', name: 'TAG' }],
        prod_Q8qLskAqK9HTo8: [{ id: '1229468577279770755', name: 'TAG' }],
        prod_PiwzLgsemmCJ18: [{ id: '1229468577279770755', name: 'TAG' }],
        prod_Q7j3Vx68kflDV3: [{ id: '1229468577279770755', name: 'TAG' }],
        prod_Q7j4DjrPMOQgyJ: [{ id: '1229468577279770755', name: 'TAG' }],
      }
    : {
        prod_QIDM1cMlwTO01V: [{ id: '1229468577279770755', name: 'TAG' }],
        prod_QIDMquP7wpaYQT: [{ id: '1229468577279770755', name: 'TAG' }],
      };
