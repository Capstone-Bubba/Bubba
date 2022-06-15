package com.twogudak.bubba.Ui.Calendar

import android.view.View
import android.widget.CalendarView
import android.widget.TextView
import com.kizitonwose.calendarview.model.CalendarDay
import com.kizitonwose.calendarview.model.DayOwner
import com.kizitonwose.calendarview.ui.ViewContainer
import com.twogudak.bubba.R
import java.time.LocalDate

class DayViewContainer(view:View,var selectedData: LocalDate?) : ViewContainer(view) {
    lateinit var day: CalendarDay
    val textView = view.findViewById<TextView>(R.id.calendarDayText)
    init {
        view.setOnClickListener {
            if (day.owner == DayOwner.THIS_MONTH) {
                if ( selectedData != day.date) {
                    val oldData = selectedData
                    val binding = view.findViewById<View>(R.id.fragment_calendar_view)
                    val calendar = binding.findViewById<com.kizitonwose.calendarview.CalendarView>(R.id.calendarView)
                    calendar.notifyDateChanged(day.date)
                    oldData?.let { calendar.notifyDateChanged(it) }
                    //DataLoad



                }
            }
        }
    }
}

class MonthViewContainer(view: View) : ViewContainer(view) {

}

