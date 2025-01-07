import { Flex, Progress, Tag } from "antd";
import React from "react";

function ProgressChart({ Skills }) {
  console.log("From", Skills);

  function handlePercentageProgress(level) {
    if (level == 1) {
      return 33;
    } else if (level == 2) {
      return 66;
    } else if (level == 3) {
      return 100;
    }
  }

  return (
    <>
      {Skills?.updatedAt && (
        <p>Last Updated at : {new Date(Skills?.updatedAt).toLocaleString()}</p>
      )}

      <div>
        <Flex gap="small" wrap>
          {Skills?.userSkills?.length > 0 &&
            Skills?.userSkills?.map((skill) => {
              const currentLevel = skill?.skillLevel[0]?.currentLevel;
              const updatedLevel = skill?.skillLevel[0]?.updatedLevel;

              const currentLevelPercentage = updatedLevel - currentLevel;
              const updatedLevelPercentage = updatedLevel;
              const tagColor =
                currentLevel >= updatedLevel ? "#f50" : "#87d068";

              return (
                <div key={skill._id}>
                  <Progress
                    percent={handlePercentageProgress(updatedLevelPercentage)}
                    type="dashboard"
                    format={() => (
                      <div>
                        <p style={{ margin: 0 }}>{updatedLevelPercentage}</p>
                        <Tag color={tagColor} style={{ fontSize: "0.8rem" }}>
                          {currentLevelPercentage}
                        </Tag>
                      </div>
                    )}
                  />

                  <p
                    style={{
                      textAlign: "center",
                      margin: 0,
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {skill?.skill}
                  </p>
                </div>
              );
            })}
        </Flex>
      </div>
    </>
  );
}

export default ProgressChart;
