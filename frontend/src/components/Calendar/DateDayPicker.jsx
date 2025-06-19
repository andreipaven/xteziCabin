import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useEffect, useRef, useState } from "react";
import "./DateDayPicker.css";
import CustomBox from "../Containers/CustomBox.jsx";
import themeColors from "../../Theme/themeColors.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";
import { notify } from "../Notifications/notifications.js";
import "react-toastify/dist/ReactToastify.css";
import { fetchGetBookings } from "../../Services/bookingService.js";

export default function DateDayPicker({ onSelectDate }) {
  const { isSmallScreen } = useResponsive();

  const justOneTrim = useRef(false);

  const [selected, setSelected] = useState({ from: undefined, to: undefined });

  const allBookedDays = [];

  const [twoConsecutiveDays, setTwoConsecutiveDays] = useState([]);

  const [uniqueBookedDaysForCalendar, setUniqueBookedDaysForCalendar] =
    useState([]);

  const handleSelect = (date) => {
    if (!date) {
      setSelected(undefined);
      onSelectDate(undefined);
      return;
    }

    const isRangeValid = (range) => {
      if (!range?.from || !range?.to) return true;

      const fromTime = range.from.getTime();
      const toTime = range.to.getTime();

      // 1. We check if the user has selected a range that includes a blocked day.
      const includesBlockedDay = uniqueBookedDaysForCalendar.some(
        (blockedDate) => {
          const blockedTime = blockedDate.getTime();
          return blockedTime >= fromTime && blockedTime <= toTime;
        },
      );

      if (includesBlockedDay) {
        return false;
      }

      // 2. We check if the range includes an entire group of exactly 2 consecutive days.

      for (const rangePair of twoConsecutiveDays) {
        const [start, end] = rangePair.map((d) => new Date(d).getTime());

        if (start >= fromTime && end <= toTime) {
          return;
        }
      }

      return true;
    };

    if (isRangeValid(date) === true) {
      setSelected(date);
      onSelectDate(date);
    } else if (isRangeValid(date) === false) {
      notify("Intervalul selectat conține zile ocupate!", "error");
      setTimeout(() => {
        notify("Va rugam selectati alta perioada!", "warning");
      }, 2500);
    } else {
      notify(
        "Nu poți selecta acest interval. Conține 2 zile blocate consecutive chiar daca nu sunt cu rosu.",
        "error",
      );
    }
  };

  const trimRangeEnds = (dates) => {
    if (!dates || dates.length < 2)
      return { trimmedDays: dates, exactTwoDayRanges: [] };

    // 1. Sortare
    const sorted = [...dates].sort((a, b) => new Date(a) - new Date(b));

    // 2. Grupare în intervale consecutive
    const ranges = [];
    let currentRange = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = (curr - prev) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentRange.push(sorted[i]);
      } else {
        ranges.push(currentRange);
        currentRange = [sorted[i]];
      }
    }
    ranges.push(currentRange);

    // 3. Separăm intervalele în două categorii
    const trimmedDays = [];
    const exactTwoDayRanges = [];

    ranges.forEach((range) => {
      if (range.length === 2) {
        exactTwoDayRanges.push(range); // exact 2 zile → salvăm separat
      } else if (range.length > 2) {
        trimmedDays.push(...range.slice(1, -1)); // mai lung → păstrăm fără capete
      }
      // range.length === 1 → ignorăm complet
    });

    return {
      trimmedDays,
      exactTwoDayRanges,
    };
  };

  const getDaysInRange = (startDate, endDate) => {
    const days = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    const current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  useEffect(() => {
    fetchGetBookings().then((result) => {
      if (result.success) {
        result.result.rows.forEach((booking) => {
          const days = getDaysInRange(booking.start_date, booking.end_date);
          allBookedDays.push(...days);
        });
      } else {
        console.log(result.message);
      }

      const uniqueDays = [...new Set(allBookedDays)];

      console.log(uniqueDays);
      if (!justOneTrim.current && uniqueDays.length > 0) {
        const { trimmedDays, exactTwoDayRanges } = trimRangeEnds(uniqueDays);
        setUniqueBookedDaysForCalendar(trimmedDays);
        setTwoConsecutiveDays(exactTwoDayRanges);
        justOneTrim.current = true;
      }
    });
  }, []);
  return (
    <CustomBox
      gap={"1em"}
      flexDirection={isSmallScreen ? "column" : "row"}
      alignItems={"start"}
    >
      <CustomBox
        backgroundColor={themeColors.palette.primary.contrastText}
        borderRadius={"1em"}
        boxShadow={
          "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;"
        }
      >
        <DayPicker
          animate
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          disabled={[{ before: new Date() }, ...uniqueBookedDaysForCalendar]}
          modifiers={{ blocked: uniqueBookedDaysForCalendar }}
          modifiersClassNames={{
            blocked: "blocked-day",
          }}
          navLayout={"around"}
          fromYear={2025}
          toYear={2100}
          captionLayout="dropdown-years"
        />
      </CustomBox>
    </CustomBox>
  );
}
