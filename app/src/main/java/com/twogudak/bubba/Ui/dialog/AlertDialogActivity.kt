package com.twogudak.bubba.Ui.dialog

import android.content.Context
import android.media.Ringtone
import android.media.RingtoneManager
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Vibrator
import android.util.Log
import android.widget.Button
import android.widget.TextView
import com.twogudak.bubba.R
import java.net.URI

class AlertDialogActivity() : AppCompatActivity() {

    lateinit var AlertDialogContent : TextView
    lateinit var AlertDialogCheckButton : Button
    private lateinit var vibrator: Vibrator
    private val pattern = longArrayOf(100, 200, 100, 200, 100, 200)
    private lateinit var Ring: Ringtone


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_alert_dialog)

        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        vibrator.vibrate(pattern, 0)

        val RingURL = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM)
        Ring = RingtoneManager.getRingtone(applicationContext,RingURL)

        Ring.play()

        AlertDialogContent = findViewById(R.id.AlertDialog_context_text)
        AlertDialogCheckButton = findViewById(R.id.AlertDialog_Check_Button)

        var contentText = intent.getStringExtra("Content")
        intent.removeExtra("Content")
        var clear = intent.getStringExtra("Content")
        Log.d("receiveIntent content",contentText.toString())
        Log.d("receiveIntent content",clear.toString())
        AlertDialogContent.text = contentText


        AlertDialogCheckButton.setOnClickListener {
            vibrator.cancel()
            Ring.stop()
            finish()
        }

    }

    override fun onStart() {
        super.onStart()



    }

}