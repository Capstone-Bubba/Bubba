package com.twogudak.bubba.Ui.dialog

import android.content.Context
import android.media.Ringtone
import android.media.RingtoneManager
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Vibrator
import android.speech.tts.TextToSpeech
import android.util.Log
import android.widget.Button
import android.widget.Switch
import android.widget.TextView
import android.widget.Toast
import com.twogudak.bubba.R
import kotlinx.coroutines.delay
import org.w3c.dom.Text
import java.net.URI
import java.util.*

class AlertDialogActivity() : AppCompatActivity() {

    lateinit var AlertDialogContent: TextView
    lateinit var AlertDialogCheckButton: Button
    private lateinit var vibrator: Vibrator
    private val pattern1 = longArrayOf(100, 200, 100, 200, 100, 200)
    private val pattern2 = longArrayOf(100, 100, 200, 100, 100, 200)
    private val pattern3 = longArrayOf(300, 100, 100, 100, 300, 100)
    private val pattern4 = longArrayOf(400, 100, 100, 100, 400, 100)
    private val pattern5 = longArrayOf(100, 100, 300, 100, 100, 300)
    private val pattern6 = longArrayOf(200, 100, 100, 100, 100, 100)
    private lateinit var Ring: Ringtone
    private var tts : TextToSpeech? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_alert_dialog)


        var contentText = intent.getStringExtra("Content")
        intent.removeExtra("Content")
        Log.d("AlertDialogActivity", contentText.toString())


        val RingURL = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM)
        Ring = RingtoneManager.getRingtone(applicationContext,RingURL)


        AlertDialogContent = findViewById(R.id.AlertDialog_context_text)
        AlertDialogCheckButton = findViewById(R.id.AlertDialog_Check_Button)

        if (contentText != "null") {
            VibratorSetting(contentText!!)
            initTextToSpech(contentText!!)

            AlertDialogContent.text = contentText
        } else {
            AlertDialogContent.text = ""
        }




        AlertDialogCheckButton.setOnClickListener {
            Ring.stop()
            if (contentText != "null") {
                vibrator.cancel()
                SpeackTTS(contentText){
                    finish()
                }
            }


        }

    }


    private fun VibratorSetting(Content: String): Vibrator {
        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator

        when (Content) {
            "뒷면" -> {
                vibrator.vibrate(pattern1, 0)
            }
            "불편함" -> {
                vibrator.vibrate(pattern2, 0)
            }
            "배아픔" -> {
                vibrator.vibrate(pattern3, 0)
            }
            "배고픔" -> {
                vibrator.vibrate(pattern4, 0)
            }
            "트름" -> {
                vibrator.vibrate(pattern5, 0)
            }
            "피곤함" -> {
                vibrator.vibrate(pattern6, 0)
            }
        }
        return vibrator
    }

    private fun initTextToSpech(Content: String) {
        tts = TextToSpeech(this, TextToSpeech.OnInitListener {
            if (it == TextToSpeech.SUCCESS) {
                val result = tts!!.setLanguage(Locale.KOREAN)
                if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    Toast.makeText(this, "TTS Not Suppoerted", Toast.LENGTH_SHORT).show()
                    return@OnInitListener
                } else {
                    SpeackTTS(Content){
                        Ring.play()
                    }
                }
            } else {
                Toast.makeText(this, "TTS Init failed", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun SpeackTTS(Content: String, callback: () -> Unit) {
        when (Content) {
            "뒷면" -> {
                tts?.speak("아이가 엎드려 있습니다", TextToSpeech.QUEUE_FLUSH, null,null)
                tts?.playSilentUtterance(500, TextToSpeech.QUEUE_ADD, null)
                tts?.speak("아이가 엎드려 있습니다", TextToSpeech.QUEUE_FLUSH, null,null)
                callback.invoke()
            }
            "불편함" -> {
                tts?.speak("아이가 불편하여 울고있습니다.", TextToSpeech.QUEUE_FLUSH, null, null)
                tts?.playSilentUtterance(500, TextToSpeech.QUEUE_ADD, null)
                tts?.speak("아이가 불편하여 울고있습니다.", TextToSpeech.QUEUE_FLUSH, null, null)
                callback.invoke()
            }
            "배아픔" -> {
                tts?.speak("아이가 배가 아파 울고있습니다.", TextToSpeech.QUEUE_FLUSH, null, null)
                tts?.playSilentUtterance(500, TextToSpeech.QUEUE_ADD, null)
                callback.invoke()
            }
            "배고픔" -> {
                tts?.speak("아이가 배고파 울고 있습니다", TextToSpeech.QUEUE_FLUSH, null, null)
                tts?.playSilentUtterance(1000, TextToSpeech.QUEUE_ADD, null)
                callback.invoke()
            }
            "트름" -> {
                tts?.speak("아이가 트름을 하고 싶어 울고있습니다.", TextToSpeech.QUEUE_FLUSH, null, null)
                tts?.playSilentUtterance(1000, TextToSpeech.QUEUE_ADD, null)
                callback.invoke()
            }
            "피곤함" -> {
                tts?.speak("아이가 피곤하여 울고있습니다.", TextToSpeech.QUEUE_FLUSH, null, null)
                tts?.playSilentUtterance(1000, TextToSpeech.QUEUE_ADD, null)
                callback.invoke()
            }
        }
    }



    override fun onStart() {
        super.onStart()



    }


}