package com.twogudak.bubba.Ui.dialog

import android.app.DatePickerDialog
import android.app.Dialog
import android.content.DialogInterface
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.DialogFragment
import com.google.android.material.textfield.TextInputEditText
import com.twogudak.bubba.R
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.Home.Home
import com.twogudak.bubba.Ui.rootPage.rootActivty
import java.util.*

class register_dialog: DialogFragment() {
    lateinit var cancelbt: Button
    lateinit var registerbt: Button
    lateinit var babyname: TextInputEditText
    lateinit var babybirth: TextView
    lateinit var dateString: String
    lateinit var calendarbt: Button
    lateinit var rootActivty: rootActivty
    val TAG = "register_dialog"
    var birth = ""
    var name: String?  = ""



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        rootActivty = context as rootActivty
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.register_dialog,container, true)

        cancelbt = v.findViewById(R.id.register_dialog_cancle)
        registerbt = v.findViewById(R.id.register_dialog_regist)
        babyname = v.findViewById(R.id.register_dialog_babyname_textfield)
        babybirth = v.findViewById(R.id.register_dialog_date)
        calendarbt = v.findViewById(R.id.register_dialog_popcalendar)

        return v
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val appSetting by lazy {
            ApplicationSetting(rootActivty)
        }



        cancelbt.setOnClickListener { dismiss() }
        calendarbt.setOnClickListener {
            val cal = Calendar.getInstance()
            val dateSetListener = DatePickerDialog.OnDateSetListener{view, year, mounth, dayOfMounth ->
                dateString = "${year}년 ${mounth+1}월 ${dayOfMounth}일"
                var mounthstring = ""
                var daystring = ""
                if (mounth < 10){
                    mounthstring = "0${mounth}"
                } else {
                    mounthstring = "${mounth}"
                }
                if (dayOfMounth < 10) {
                    daystring = "0${dayOfMounth}"
                } else {
                    daystring = "${dayOfMounth}"
                }

                birth = "${year}${mounthstring}${daystring}"
                babybirth.text = dateString
                babybirth.setTextColor(Color.BLACK)
            }
            DatePickerDialog(rootActivty,dateSetListener, cal.get(Calendar.YEAR),cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH)).show()
        }
        registerbt.setOnClickListener {
            name = babyname.text?.toString()
            if (name.isNullOrEmpty()){
                Log.e(TAG,"이름 칸 비어있음")
                Toast.makeText(requireContext(),"아기 이름이 비어 있습니다.",Toast.LENGTH_SHORT).show()
            } else if (birth.isNullOrEmpty()){
                Log.e(TAG,"날짜 선택안함")
                Toast.makeText(requireContext(),"날짜를 선택해주세요.",Toast.LENGTH_SHORT).show()
            } else {

                appSetting.setBabyInfo(name.toString(),birth)
                Log.d(TAG,"아기이름, 아기 생일 셋팅완료 아기이름 : ${name}, 생일: ${birth}")
            }
            dismiss()
        }
    }

    override fun onDismiss(dialog: DialogInterface) {
        super.onDismiss(dialog)
        val fragment = parentFragment
        if(fragment is DialogInterface.OnDismissListener) {
            (fragment as DialogInterface.OnDismissListener).onDismiss(dialog)
        }
    }

}