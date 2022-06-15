package com.twogudak.bubba.Ui.Calendar

import android.util.Log
import android.view.View
import android.widget.CalendarView
import android.widget.LinearLayout
import android.widget.TextView
import com.kizitonwose.calendarview.model.CalendarDay
import com.kizitonwose.calendarview.model.DayOwner
import com.kizitonwose.calendarview.ui.ViewContainer
import com.twogudak.bubba.R
import kotlinx.coroutines.selects.select
import java.time.LocalDate

class DayViewContainer(view:View,var calendar_fragment: LinearLayout,selectDate: LocalDate?) : ViewContainer(view) {

    lateinit var day: CalendarDay
    val binding = view.findViewById<View>(R.id.calendar_day_view)
    val textView = view.findViewById<TextView>(R.id.calendarDayText)
    val calendarLine = view.findViewById<View>(R.id.calendarDayLine)
    init {
        view.setOnClickListener {
            if (day.owner == DayOwner.THIS_MONTH) {
                if ( selectDate != day.date) {
                    var oldDate = selectDate
                    Log.d("calendarSelect","select date : "+ selectDate)
                    Log.d("calendarSelect","old date : "+ oldDate)
                    val binding = calendar_fragment
                    val calendar = binding.findViewById<com.kizitonwose.calendarview.CalendarView>(R.id.calendarView)
                    calendar.notifyDateChanged(day.date)

                    oldDate?.let { calendar.notifyDateChanged(it) }

                    //DataLoad
                }
            }
        }
    }

}

class MonthViewContainer(view: View) : ViewContainer(view) {

}

