import { useTimer } from "react-timer-hook";
import TodaySales from "./TodaySales";

const FlashSales = ({ expTime }) => {
  // Convert "YYYY-MM-DD HH:MM:SS" to a valid Date object
  const formattedDate = expTime.replace(" ", "T"); // "2025-02-06T01:19:00"
  const expiryTimestamp = new Date(formattedDate);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {},
  });
  return (
    <div className="w-full">
      <div className="flex gap-x-12 items-center justify-between">
        {/* Flash Sales Header */}
        <div className="flex justify-center items-center mt-6">
          <TodaySales title={"Flash Sales"} />
        </div>

        {/* Countdown Timer */}
        <div className="flex gap-x-4 mt-3">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-black text-xl md:text-2xl font-bold">
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base text-gray-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSales;
