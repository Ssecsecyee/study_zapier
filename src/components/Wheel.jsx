import { CATEGORIES } from "../data/categories";

function Wheel({
  rotation,
  onTransitionEnd
}) {

  const sliceAngle =
    360 / CATEGORIES.length;


  return (
    <div className="wheelWrap">

      {/* 화살표 */}
      <div className="pointer" />


      {/* 돌림판 */}
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`
        }}
        onTransitionEnd={onTransitionEnd}
      >

        {CATEGORIES.map(
          (category, index) => {

            const angle =
              index * sliceAngle;

            return (

              <span
                key={category}
                className="wheelLabel"
                style={{
                  "--angle":
                    `${angle}deg`
                }}
              >

                {category}

              </span>

            );

          }
        )}

      </div>

    </div>
  );
}

export default Wheel;