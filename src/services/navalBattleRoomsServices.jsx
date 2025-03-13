export const navalBattleRoomsServices = {
  addNavalBattleRoom: async (values) => {
    const response = await fetch(
      `${import.meta.env.VITE_DB_URI}/api/navalBattle/create`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      }
    );
    if (response) console.log(response);
  },

  getNavalBattleRooms: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DB_URI}/api/navalBattle/getRooms`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response) return response.json();
  },
};
