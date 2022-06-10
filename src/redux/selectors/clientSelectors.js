export const clientState = (state) => ({
  isLoading: state.client.isLoading,
  serverErrors: state.client.serverErrors,
  isEdit: state.client.isEdit,
});
