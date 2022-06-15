package com.twogudak.bubba.Ui.Calendar

import android.view.View
import android.widget.TextView
import com.kizitonwose.calendarview.ui.ViewContainer
import com.twogudak.bubba.R

class DayViewContainer(view:View) : ViewContainer(view) {
    val textView = view.findViewById<TextView>(R.id.calendarDayText)
}

class MonthViewContainer(view: View) : ViewContainer(view) {

}

