import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";


const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
];

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {

  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data)
    })
  }, [])

  return (


    <ScrollArea.Root className="w-full overflow-hidden">
      <ScrollArea.Viewport className="w-full h-full" >
        <div className="w-full flex">
          <div className="grid grid-rows-7 grid-flow-row gap-3 absolute border-r-2 border-r-violet-500">
            {weekDays.map((weekDay, i) => {
              return (
                <div
                  key={`${weekDay}-${i}`}
                  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center bg-background"
                >
                  {weekDay}
                </div>
              )
            })}
          </div>

          <div className="grid grid-rows-7 grid-flow-col gap-3 ml-14">
            {summary.length && summaryDates.map((date) => {

              const dayInSummary = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <HabitDay
                  key={date.toString()}
                  date={date}
                  amount={dayInSummary?.amount}
                  defaultCompleted={dayInSummary?.completed}
                />
              )
            })}

            {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
              return (
                <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
              )
            })}
          </div>
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="horizontal" className="select-none touch-none p-0.5 bg-zinc-800 transition-all hover:bg-zinc-900 flex flex-col">
        <ScrollArea.Thumb className="flex-1 bg-violet-500 rounded-2xl py-1 " />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner className="bg-background" />
    </ScrollArea.Root>


  );
}