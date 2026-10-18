let nextKey = 0;

export const newVehicle = () => ({
  key: `vehicle-${++nextKey}`,
  type: "car",
  plate: "",
  make: "",
  model: "",
  color: "",
});

export const createInitialValues = () => ({
  firstName: "",
  lastName: "",
  rank: "",
  unit: "",
  cardId: "",
  phone: "",
  email: "",
  vehicles: [newVehicle()],
});
