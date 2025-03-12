import { useState } from "react";
import { Button } from "@/components/ui/button";
import { hover } from "motion";

function NavalBattleGrid({ setup }) {
  let length = 10;
  let width = 10;
  const [gameMatrix, setGameMatrix] = useState(
    Array.from({ length: length }, (_, i) =>
      Array.from({ length: width }, (_, j) => 0)
    )
  );
  const [yourTurn, setYourTurn] = useState(true);
  const [currentShip, setCurrentShip] = useState(0);

  const [currentShips, setCurrentShips] = useState([]);

  const [vertical, setVertical] = useState(false);

  const ships = [5, 4, 3, 3, 2];

  // if (gameMatrix.length != 0)
  //   ships.forEach((ship) => {
  //     ship.forEach((cell) => {
  //       gameMatrix[cell.x][cell.y] = 1;
  //     });
  //   });

  function getCellColor(cell) {
    switch (cell) {
      case 0: // Empty
        return "";
      case 1: // Ship
        return "bg-blue-300";
      case 2: // EnnemyHit
        return "bg-red-300";
      case 3: // ShipHit
        return "bg-green-300";
      case 4: // EnnemyMiss
        return "bg-green-300";
      case 5: // ShipMiss
        return "bg-yellow-300";
      case 6: // MouseHover
        return "bg-gray-300";
      default:
        return "";
    }
  }

  function canUpdateCase(grid, x, y) {
    return grid[x][y] === 0;
  }

  function hoverUpdate(type, grid, x, y) {
    if (type) {
      if (yourTurn && canUpdateCase(grid, x, y)) {
        grid[x][y] = grid[x][y] === 0 ? 6 : grid[x][y];
        setGameMatrix([...grid]);
      }
    } else {
      if (yourTurn && canExitUpdateCase(grid, x, y)) {
        grid[x][y] = grid[x][y] === 6 ? 0 : grid[x][y];
        setGameMatrix([...grid]);
      }
    }
  }

  function canUpdateCasesList(grid, x, y, ship) {
    let res = true;

    for (let i = 0; i < ship; i++) {
      let posX, posY;
      if (vertical) {
        posX = x;
        posY = y + i;
      } else {
        posX = x + i;
        posY = y;
      }

      if (posY < 0 || posY >= length) {
        res = false;
      } else if (posX < 0 || posX >= width) {
        res = false;
      } else if (!canUpdateCase(grid, posX, posY)) {
        res = false;
      }
    }

    return res;
  }

  function canExitUpdateCase(grid, x, y) {
    return grid[x][y] === 6;
  }

  function canExitUpdateCasesList(grid, x, y, ship) {
    let res = true;

    for (let i = 0; i < ship; i++) {
      let posX, posY;
      if (vertical) {
        posX = x;
        posY = y + i;
      } else {
        posX = x + i;
        posY = y;
      }

      if (posY < 0 || posY >= length) {
        res = false;
      } else if (posX < 0 || posX >= width) {
        res = false;
      } else if (!canExitUpdateCase(grid, posX, posY)) {
        res = false;
      }
    }

    return res;
  }

  function setupHoverUpdate({ type, grid, x, y, ships, currentShip }) {
    if (type) {
      if (canUpdateCasesList(grid, x, y, ships[currentShip])) {
        for (let i = 0; i < ships[currentShip]; i++) {
          let posX, posY;
          if (vertical) {
            posX = x;
            posY = y + i;
          } else {
            posX = x + i;
            posY = y;
          }
          grid[posX][posY] = grid[posX][posY] === 0 ? 6 : grid[posX][posY];
          setGameMatrix([...grid]);
        }
      }
    } else {
      if (canExitUpdateCasesList(grid, x, y, ships[currentShip])) {
        for (let i = 0; i < ships[currentShip]; i++) {
          let posX, posY;
          if (vertical) {
            posX = x;
            posY = y + i;
          } else {
            posX = x + i;
            posY = y;
          }
          grid[posX][posY] = grid[posX][posY] === 6 ? 0 : grid[posX][posY];
          setGameMatrix([...grid]);
        }
      }
    }
  }

  function setShipOnMatrix(x, y) {
    let grid = gameMatrix;

    if (canExitUpdateCasesList(gameMatrix, x, y, ships[currentShip])) {
      for (let i = 0; i < ships[currentShip]; i++) {
        let posX, posY;
        if (vertical) {
          posX = x;
          posY = y + i;
        } else {
          posX = x + i;
          posY = y;
        }
        grid[posX][posY] = 1;
      }

      setGameMatrix([...grid]);
      setCurrentShip(currentShip + 1);
      if (currentShip === ships.length) {
        setup = false;
      }
    } else {
      console.log("Can't set ship here");
    }
  }

  function handleCellClick(x, y) {
    if (setup) setShipOnMatrix(x, y);
    else {
      gameMatrix[x][y] = gameMatrix[x][y] === 6 ? 2 : 0;
      setGameMatrix([...gameMatrix]);
    }
  }

  return (
    <>
      {Array.from({ length: length }, (_, i) => (
        <div key={i} className="flex flex-row">
          {Array.from({ length: width }, (_, j) => (
            <div
              key={j}
              onClick={() => {
                handleCellClick(j, i);
              }}
              onMouseEnter={() => {
                console.log("gameMatrix", gameMatrix);
                setup
                  ? setupHoverUpdate({
                      type: true,
                      grid: gameMatrix,
                      x: j,
                      y: i,
                      ships,
                      currentShip,
                    })
                  : hoverUpdate(true, gameMatrix, j, i);
              }}
              onMouseLeave={() => {
                setup
                  ? setupHoverUpdate({
                      type: false,
                      grid: gameMatrix,
                      x: j,
                      y: i,
                      ships,
                      currentShip,
                    })
                  : hoverUpdate(false, gameMatrix, j, i);
              }}
              className={"w-10 h-10 border-1 " + getCellColor(gameMatrix[j][i])}
            ></div>
          ))}
        </div>
      ))}
      {setup && <Button onClick={() => setVertical(!vertical)}>Rotate</Button>}
    </>
  );
}

export default NavalBattleGrid;
