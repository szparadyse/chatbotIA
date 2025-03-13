import NavalBattleGrid from "./NavalBattleGrid";

function NavalBattleField() {
  return (
    <div>
      <h1>NavalBattleGrid</h1>
      <div className="">
        <NavalBattleGrid setup={true} />
        <NavalBattleGrid setup={false} />
      </div>
    </div>
  );
}

export default NavalBattleField;
