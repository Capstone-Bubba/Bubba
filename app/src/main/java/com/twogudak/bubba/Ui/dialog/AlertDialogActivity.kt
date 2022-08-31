package com.twogudak.bubba.Ui.dialog

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Vibrator
import android.widget.Button
import android.widget.TextView
import com.twogudak.bubba.R

class AlertDialogActivity() : AppCompatActivity() {

    lateinit var AlertDialogContent : TextView
    lateinit var AlertDialogCheckButton : Button
    lateinit var vibrator: Vibrator


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_alert_dialog)

        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        AlertDialogContent = findViewById(R.id.AlertDialog_context_text)
        AlertDialogCheckButton = findViewById(R.id.AlertDialog_Check_Button)

        AlertDialogContent.text = "contentText"

        AlertDialogCheckButton.setOnClickListener {
            vibrator.cancel()
            finish()
        }
    }

}