package com.twogudak.bubba.Ui.Calendar

import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.kizitonwose.calendarview.CalendarView
import com.kizitonwose.calendarview.model.CalendarDay
import com.kizitonwose.calendarview.model.CalendarMonth
import com.kizitonwose.calendarview.model.DayOwner
import com.kizitonwose.calendarview.ui.DayBinder
import com.kizitonwose.calendarview.ui.MonthHeaderFooterBinder
import com.kizitonwose.calendarview.ui.ViewContainer
import com.kizitonwose.calendarview.utils.next
import com.kizitonwose.calendarview.utils.previous
import com.twogudak.bubba.HttpData.DTO.CalendarDTO
import com.twogudak.bubba.HttpData.DTO.CalendarDetail
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.rootPage.rootActivty
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.Year
import java.time.YearMonth
import java.time.format.DateTimeFormatter
import java.time.temporal.WeekFields
import java.util.*

class Calendar : Fragment() {
    lateinit var calendarview: CalendarView
    lateinit var calendarAdapter: CalendarAdapter
    lateinit var calendarRecyclerView: RecyclerView
    lateinit var rootActivty: rootActivty
    lateinit var calendarLayout : LinearLayout
    lateinit var calendarMonthYearText: TextView
    lateinit var CalendarPreviousMounthImage : ImageView
    lateinit var CalendarNextMonthImage: ImageView
    private lateinit var calendar_ViewModel : CalendarViewModel


    var selectedDate: LocalDate? = null
    private val monthTitleFormatter = DateTimeFormatter.ofPattern("MMMM")
    lateinit var CalendarData : Map<LocalDate,List<CalendarDetail>>



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
        calendarLayout = v.findViewById(R.id.fragment_calendar_view)
        calendarMonthYearText = v.findViewById(R.id.CalendarMonthYearText)
        CalendarPreviousMounthImage = v.findViewById(R.id.CalendarPreviousMounthImage)
        CalendarNextMonthImage = v.findViewById(R.id.CalendarNextMonthImage)

        calendar_ViewModel = ViewModelProvider(rootActivty).get(CalendarViewModel::class.java)

        return v
    }

    override fun onStart() {
        super.onStart()


        calendarRecyclerView.adapter = calendarAdapter
        calendarRecyclerView.layoutManager = LinearLayoutManager(rootActivty,RecyclerView.VERTICAL,false)
        calendarRecyclerView.addItemDecoration(DividerItemDecoration(rootActivty, RecyclerView.VERTICAL))

        calendar_ViewModel.callCalendar(4).observe(viewLifecycleOwner){
            CalendarData = it.CalendarList.groupBy { LocalDate.parse(it.calendar_date, DateTimeFormatter.ISO_DATE) }
            Log.d("Call Calendar",CalendarData.toString())
            calendarAdapter.notifyDataSetChanged()
        }

        calendar_ViewModel.getmessage().observe(viewLifecycleOwner){
            Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
        }

        class DayViewContainer(view:View) : ViewContainer(view) {

            lateinit var day: CalendarDay
            val binding = view.findViewById<View>(R.id.calendar_day_view)
            val textView = view.findViewById<TextView>(R.id.calendarDayText)
            val calendarLine = view.findViewById<View>(R.id.calendarDayLine)
            init {
                view.setOnClickListener {
                    if (day.owner == DayOwner.THIS_MONTH) {
                        if ( selectedDate != day.date) {
                            var oldDate = selectedDate
                            selectedDate = day.date
                            Log.d("calendarSelect","select date : "+ selectedDate)
                            Log.d("calendarSelect","old date : "+ oldDate)
                            val binding = calendarLayout
                            val calendar = binding.findViewById<com.kizitonwose.calendarview.CalendarView>(R.id.calendarView)
                            calendar.notifyDateChanged(day.date)
                            oldDate?.let { calendar.notifyDateChanged(it) }
                            if (CalendarData.isNotEmpty()){
                                updateAdapterForDate(day.date)
                            }
                            //DataLoad
                        }
                    }
                }
            }

        }

        calendarview.dayBinder = object : DayBinder<DayViewContainer> {
            override fun create(view: View) = DayViewContainer(view)

            override fun bind(container: DayViewContainer, day: CalendarDay) {
                container.day = day
                container.textView.text = day.date.dayOfMonth.toString()
                container.calendarLine.background = null
                val layout = container.binding
                if (day.owner == DayOwner.THIS_MONTH){
                    container.textView.setTextColor(Color.BLACK)
                    Log.d("test",selectedDate.toString())
                    Log.d("day date", day.date.toString())
                    layout.setBackgroundColor(if (selectedDate == day.date) R.drawable.calendar_selected_bg else 0)
                } else {
                    container.textView.setTextColor(Color.GRAY)
                    layout.background = null
                }
            }

        }

        class MonthViewContainer(view: View) : ViewContainer(view) {

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

        calendarview.monthScrollListener = {month ->
            val title = "${monthTitleFormatter.format(month.yearMonth)} ${month.yearMonth.year}"
            calendarMonthYearText.text = title

            selectedDate?.let {
                selectedDate = null
                calendarview.notifyDateChanged(it)
            }
        }

        CalendarNextMonthImage.setOnClickListener {
            calendarview.findFirstVisibleMonth()?.let {
                calendarview.smoothScrollToMonth(it.yearMonth.next)
                calendarAdapter.calendarData.clear()
            }
        }

        CalendarPreviousMounthImage.setOnClickListener {
            calendarview.findFirstVisibleMonth()?.let {
                calendarview.smoothScrollToMonth(it.yearMonth.previous)
                calendarAdapter.calendarData.clear()
            }
        }


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

    private fun updateAdapterForDate(date: LocalDate?) {
        calendarAdapter.calendarData.clear()
        calendarAdapter.calendarData.addAll(CalendarData[date].orEmpty())
        calendarAdapter.notifyDataSetChanged()
    }



}