package com.twogudak.bubba.Ui.dialog

import android.content.DialogInterface
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.DialogFragment
import com.google.android.material.textfield.TextInputEditText
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.rootPage.rootActivty

class CalendarUpdateDialog: DialogFragment() {
    lateinit var rootActivty: rootActivty

    val TAG = "Calendar Update Dialog"
    lateinit var titleTextField : TextInputEditText
    lateinit var contentField : EditText
    lateinit var registBT : Button
    lateinit var CancelBT : Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        rootActivty = context as rootActivty
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.calendarupdate_dialog, container, false)
        titleTextField = v.findViewById(R.id.Calendar_Title_TextField)
        contentField = v.findViewById(R.id.CalendarUpdate_EditText)
        registBT = v.findViewById(R.id.CalendarUpdate_registbt)
        CancelBT = v.findViewById(R.id.CalendarUpdate_Canclebt)

        return v
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        CancelBT.setOnClickListener {
            dismiss()
        }


    }

    override fun onDismiss(dialog: DialogInterface) {
        super.onDismiss(dialog)
        val fragment = parentFragment
        if (fragment is DialogInterface.OnDismissListener) {
            (fragment as DialogInterface.OnDismissListener).onDismiss(dialog)
        }
    }

    override fun onResume() {
        super.onResume()
        dialog?.window?.setLayout(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT)
        //dialog?.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
    }
}