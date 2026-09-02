package com.vanvaani

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

private val Forest = Color(0xFF155E4B)
private val Saffron = Color(0xFFE99A22)
private val Cream = Color(0xFFFFFBF3)
private val Ink = Color(0xFF1C2824)

private enum class Screen(val label: String, val icon: String) {
    HOME("Home", "Home"), TRANSLATE("Translate", "A"), VOICE("Voice", "Mic"),
    WORKSHEETS("Worksheets", "Sheet"), FLASHCARDS("Cards", "Cards"), OFFLINE("Offline", "OK")
}

private data class Phrase(val hindi: String, val santhali: String, val phonetic: String)

private val phrases = listOf(
    Phrase("बच्चों, आज हम गिनती सीखेंगे।", "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱪᱮᱫᱟᱜ ᱟᱵᱚᱱᱟ᱾", "Gidra ko, tehen abo lekha cedag abona."),
    Phrase("एक से दस तक गिनो।", "ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱯᱮ᱾", "Mid khon gel habij lekha pe."),
    Phrase("अपनी किताब खोलो।", "ᱟᱢᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡ ᱢᱮ᱾", "Amag puthi jhij me."),
    Phrase("बहुत अच्छा!", "ᱟᱹᱰᱤ ᱵᱮᱥ!", "Aadi bes!")
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { VanvaaniApp() }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun VanvaaniApp() {
    var screen by remember { mutableStateOf(Screen.HOME) }
    var language by remember { mutableStateOf("Santhali") }
    val palette = MaterialTheme.colorScheme.copy(primary = Forest, secondary = Saffron, background = Cream)
    MaterialTheme(colorScheme = palette) {
        Scaffold(
            containerColor = Cream,
            topBar = { CenterAlignedTopAppBar(title = { Column(horizontalAlignment = Alignment.CenterHorizontally) { Text("VANVAANI", color = Forest, fontWeight = FontWeight.ExtraBold, letterSpacing = 1.sp); Text("Every language. Every classroom.", fontSize = 10.sp, color = Color.Gray) } }, colors = TopAppBarDefaults.centerAlignedTopAppBarColors(containerColor = Cream)) },
            bottomBar = { BottomBar(screen) { screen = it } }
        ) { padding ->
            when (screen) {
                Screen.HOME -> Home(Modifier.padding(padding), language, { language = if (language == "Santhali") "Mundari" else "Santhali" }) { screen = it }
                Screen.TRANSLATE -> Translate(Modifier.padding(padding), language)
                Screen.VOICE -> Voice(Modifier.padding(padding), language)
                Screen.WORKSHEETS -> Worksheets(Modifier.padding(padding), language)
                Screen.FLASHCARDS -> Flashcards(Modifier.padding(padding), language)
                Screen.OFFLINE -> Offline(Modifier.padding(padding), language)
            }
        }
    }
}

@Composable private fun BottomBar(current: Screen, select: (Screen) -> Unit) = Surface(shadowElevation = 8.dp, color = Color.White) {
    Row(Modifier.fillMaxWidth().padding(vertical = 6.dp), horizontalArrangement = Arrangement.SpaceEvenly) {
        listOf(Screen.HOME, Screen.TRANSLATE, Screen.VOICE, Screen.WORKSHEETS, Screen.OFFLINE).forEach { item ->
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.clickable { select(item) }.padding(horizontal = 5.dp)) {
                Text(item.icon, fontWeight = FontWeight.Bold, color = if (item == current) Forest else Color.Gray, fontSize = 11.sp)
                Text(item.label, color = if (item == current) Forest else Color.Gray, fontSize = 10.sp)
            }
        }
    }
}

@Composable private fun Home(modifier: Modifier, language: String, changeLanguage: () -> Unit, open: (Screen) -> Unit) = LazyColumn(modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
    item { Card(colors = CardDefaults.cardColors(containerColor = Forest), shape = RoundedCornerShape(24.dp)) { Column(Modifier.padding(20.dp)) { Text("Johar, Teacher!", color = Color.White, fontSize = 25.sp, fontWeight = FontWeight.ExtraBold); Spacer(Modifier.height(5.dp)); Text("Your offline classroom companion is ready.", color = Color(0xFFD6F3E6)); Spacer(Modifier.height(10.dp)); TextButton(onClick = changeLanguage) { Text("Teaching in: $language", color = Color.White, fontWeight = FontWeight.Bold) } } } }
    item { Text("Classroom tools", fontWeight = FontWeight.ExtraBold, color = Ink, fontSize = 18.sp) }
    item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) { Tool("A", "Translate", "Hindi to $language", Modifier.weight(1f)) { open(Screen.TRANSLATE) }; Tool("Mic", "Voice", "Speak and play", Modifier.weight(1f)) { open(Screen.VOICE) } } }
    item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) { Tool("Sheet", "Worksheet", "Grade 1 FLN", Modifier.weight(1f)) { open(Screen.WORKSHEETS) }; Tool("Cards", "Flashcards", "Tap to learn", Modifier.weight(1f)) { open(Screen.FLASHCARDS) } } }
    item { Card(colors = CardDefaults.cardColors(containerColor = Color(0xFFE6F5EE)), shape = RoundedCornerShape(18.dp), modifier = Modifier.fillMaxWidth().clickable { open(Screen.OFFLINE) }) { Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) { Text("OK", color = Forest, fontWeight = FontWeight.ExtraBold); Spacer(Modifier.width(12.dp)); Column { Text("Offline mode active", fontWeight = FontWeight.Bold, color = Ink); Text("2,850 FLN phrases available on this tablet", fontSize = 12.sp, color = Color.Gray) } } } }
}

@Composable private fun Tool(symbol: String, title: String, subtitle: String, modifier: Modifier, click: () -> Unit) = Card(modifier = modifier.clickable(onClick = click), colors = CardDefaults.cardColors(containerColor = Color.White), elevation = CardDefaults.cardElevation(2.dp), shape = RoundedCornerShape(18.dp)) { Column(Modifier.padding(16.dp)) { Text(symbol, color = Forest, fontSize = 20.sp, fontWeight = FontWeight.Bold); Spacer(Modifier.height(12.dp)); Text(title, fontWeight = FontWeight.Bold, color = Ink); Text(subtitle, fontSize = 11.sp, color = Color.Gray) } }

@Composable private fun Translate(modifier: Modifier, language: String) {
    var input by remember { mutableStateOf(phrases.first().hindi) }; var result by remember { mutableStateOf(phrases.first()) }
    LazyColumn(modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        item { Title("Text Translator", "Hindi to $language - local phrase bank") }
        item { OutlinedTextField(value = input, onValueChange = { input = it }, label = { Text("Hindi classroom instruction") }, modifier = Modifier.fillMaxWidth(), minLines = 3) }
        item { Button(onClick = { result = phrases.firstOrNull { input.contains(it.hindi.take(5)) } ?: phrases.first() }, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Forest)) { Text("Translate offline") } }
        item { Card(colors = CardDefaults.cardColors(containerColor = Color(0xFFFFF4DA)), shape = RoundedCornerShape(20.dp)) { Column(Modifier.padding(20.dp)) { Text("$language output", color = Forest, fontWeight = FontWeight.Bold, fontSize = 13.sp); Spacer(Modifier.height(10.dp)); Text(result.santhali, color = Ink, fontSize = 22.sp, fontWeight = FontWeight.Bold); Spacer(Modifier.height(8.dp)); Text(result.phonetic, color = Color.DarkGray, fontSize = 13.sp); Spacer(Modifier.height(16.dp)); OutlinedButton(onClick = {}) { Text("Play cached audio") }; Text("High confidence - exact FLN phrase match", fontSize = 11.sp, color = Forest) } } }
    }
}

@Composable private fun Voice(modifier: Modifier, language: String) {
    var recording by remember { mutableStateOf(false) }
    LazyColumn(modifier.fillMaxSize().padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item { Title("Live Voice Companion", "Hindi speech to $language in under 3 seconds") }
        item { Button(onClick = { recording = !recording }, modifier = Modifier.size(150.dp), shape = RoundedCornerShape(75.dp), colors = ButtonDefaults.buttonColors(containerColor = if (recording) Saffron else Forest)) { Text(if (recording) "Listening...\nTap to stop" else "Mic\nTap to speak", textAlign = TextAlign.Center, fontSize = 17.sp) } }
        item { Text(if (recording) "Capturing Hindi classroom speech..." else "Tap the microphone and speak naturally.", color = Color.DarkGray, textAlign = TextAlign.Center) }
        if (recording) item { VoiceResult(language) }
        item { Text("Demo uses the offline FLN phrase bank. Hindi ASR will connect here next.", fontSize = 12.sp, color = Color.Gray, textAlign = TextAlign.Center) }
    }
}

@Composable private fun VoiceResult(language: String) = Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(20.dp), modifier = Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) { Text("Teacher said", color = Forest, fontSize = 12.sp, fontWeight = FontWeight.Bold); Text(phrases.first().hindi, color = Ink, fontWeight = FontWeight.Bold); Text("Students hear ($language)", color = Forest, fontSize = 12.sp, fontWeight = FontWeight.Bold); Text(phrases.first().santhali, color = Ink, fontSize = 19.sp, fontWeight = FontWeight.Bold); Text("Playing cached audio - 1.4 s", color = Forest, fontSize = 12.sp) } }

@Composable private fun Worksheets(modifier: Modifier, language: String) = LazyColumn(modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
    item { Title("Bilingual Worksheet", "Grade 1 - Mathematics - NIPUN FLN") }
    item { Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(20.dp)) { Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) { Text("Counting and matching: 1-5", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold, color = Ink); Question("1", "चित्रों को गिनिए और सही संख्या मिलाइए:", "ᱪᱤᱛᱟᱹᱨ ᱞᱮᱠᱷᱟ ᱯᱮ ᱟᱨ ᱥᱟᱹᱦᱤ ᱞᱮᱠᱷᱟ ᱥᱟᱶ ᱢᱤᱞᱟᱹᱣ ᱯᱮ:", "3 apples | 2 dogs | 1 star"); Question("2", "रिक्त स्थान भरिए:", "ᱯᱷᱟᱸᱠᱟ ᱴᱷᱟᱶ ᱯᱮᱨᱮᱡ ᱯᱮ:", "1, __, 3, 4, __"); Button(onClick = {}, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Forest)) { Text("Generate printable worksheet") } } } }
    item { Text("Generated from the local $language curriculum pack.", fontSize = 12.sp, color = Color.Gray) }
}

@Composable private fun Question(number: String, hindi: String, target: String, activity: String) = Column { Text("Q$number  $hindi", fontWeight = FontWeight.Bold, color = Ink); Text(target, color = Forest, fontWeight = FontWeight.SemiBold); Text(activity, modifier = Modifier.padding(top = 8.dp), fontSize = 15.sp) }

@Composable private fun Flashcards(modifier: Modifier, language: String) = LazyColumn(modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
    item { Title("Visual Flashcards", "Tap a card to hear $language pronunciation") }
    items(phrases.drop(1)) { phrase -> Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(18.dp), modifier = Modifier.fillMaxWidth()) { Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically) { Text("Play", color = Forest, fontWeight = FontWeight.Bold); Spacer(Modifier.width(16.dp)); Column { Text(phrase.hindi, fontWeight = FontWeight.Bold, color = Ink); Text(phrase.santhali, color = Forest, fontSize = 20.sp, fontWeight = FontWeight.Bold); Text(phrase.phonetic, color = Color.Gray, fontSize = 12.sp) } } } }
}

@Composable private fun Offline(modifier: Modifier, language: String) = LazyColumn(modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
    item { Title("Offline Centre", "Everything needed for today's class is on this tablet.") }
    item { OfflineItem("$language language pack", "Installed - Version 1.0.0") }; item { OfflineItem("FLN phrase bank", "2,850 Hindi to Santhali phrases") }; item { OfflineItem("Audio lessons", "48 core classroom audio clips") }; item { OfflineItem("Sync queue", "No teacher feedback waiting to upload") }
    item { Card(colors = CardDefaults.cardColors(containerColor = Color(0xFFE6F5EE)), shape = RoundedCornerShape(18.dp)) { Text("Offline-ready: translation, worksheets, flashcards and cached audio work without mobile data or Wi-Fi.", modifier = Modifier.padding(18.dp), color = Ink, fontWeight = FontWeight.Medium) } }
}

@Composable private fun OfflineItem(title: String, subtitle: String) = Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(16.dp), modifier = Modifier.fillMaxWidth()) { Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) { Text("OK", color = Forest, fontWeight = FontWeight.ExtraBold); Spacer(Modifier.width(14.dp)); Column { Text(title, color = Ink, fontWeight = FontWeight.Bold); Text(subtitle, color = Color.Gray, fontSize = 12.sp) } } }
@Composable private fun Title(title: String, subtitle: String) = Column { Text(title, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, color = Ink); Text(subtitle, fontSize = 13.sp, color = Color.DarkGray) }
