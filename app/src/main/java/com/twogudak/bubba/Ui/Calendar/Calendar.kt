package com.twogudak.bubba.Ui.Calendar

import android.content.Context
import android.graphics.Color
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.kizitonwose.calendarview.CalendarView
import com.kizitonwose.calendarview.model.CalendarDay
import com.kizitonwose.calendarview.model.CalendarMonth
import com.kizitonwose.calendarview.model.DayOwner
import com.kizitonwose.calendarview.ui.DayBinder
import com.kizitonwose.calendarview.ui.MonthHeaderFooterBinder
import com.kizitonwose.calendarview.ui.ViewContainer
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.rootPage.rootActivty
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.Year
import java.time.YearMonth
import java.time.temporal.WeekFields
import java.util.*

class Calendar : Fragment() {
    lateinit var calendarview: CalendarView
    lateinit var calendarAdapter: CalendarAdapter
    lateinit var calendarRecyclerView: RecyclerView
    lateinit var rootActivty: rootActivty
    private var selectedDate: LocalDate? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        rootActivty = context as rootActivty

        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_calendar, container, false)
        calendarview = v.findViewById(R.id.calendarView)
        calendarAdapter = CalendarAdapter(rootActivty)
        calendarRecyclerView = v.findViewById(R.id.calendar_recycler)
        return v
    }

    override fun onStart() {
        super.onStart()

        calendarRecyclerView.adapter = calendarAdapter
        calendarRecyclerView.layoutManager = LinearLayoutManager(rootActivty)

        calendarview.dayBinder = object : DayBinder<DayViewContainer> {
            override fun create(view: View) = DayViewContainer(view, selectedDate)

            override fun bind(container: DayViewContainer, day: CalendarDay) {
                container.textView.text = day.date.dayOfMonth.toString()
                if (day.owner == DayOwner.THIS_MONTH){
                    container.textView.setTextColor(Color.BLACK)
                } else {
                    container.textView.setTextColor(Color.GRAY)
                }
            }
        }

        calendarview.monthHeaderBinder = object : MonthHeaderFooterBinder<MonthViewContainer> {
            override fun create(view: View) = MonthViewContainer(view)
            override fun bind(container: MonthViewContainer, month: CalendarMonth) {

            }
        }

        val currentMonth = YearMonth.now()
        val firstMonth = currentMonth.minusMonths(10)
        val lastMounth = currentMonth.plusMonths(10)
        val dayOfWeek = daysOfWeekFromLocale()
        calendarview.setup(firstMonth,lastMounth,dayOfWeek.first())
        calendarview.scrollToMonth(currentMonth)


    }

    fun daysOfWeekFromLocale(): Array<DayOfWeek> {
        val firstDayOfWeek = WeekFields.of(Locale.getDefault()).firstDayOfWeek
        val daysOfWeek = DayOfWeek.values()
        // Order `daysOfWeek` array so that firstDayOfWeek is at index 0.
        // Only necessary if firstDayOfWeek is not DayOfWeek.MONDAY which has ordinal 0.
        if (firstDayOfWeek != DayOfWeek.MONDAY) {
            val rhs = daysOfWeek.sliceArray(firstDayOfWeek.ordinal..daysOfWeek.indices.last)
            val lhs = daysOfWeek.sliceArray(0 until firstDayOfWeek.ordinal)
            return rhs + lhs
        }
        return daysOfWeek
    }

}