<template>
  <header>
    <h1>Easy Crypto</h1>
    <p>{{ texts[language].description }}</p>
  </header>
  <main>
    <section>
      <h2>{{ texts[language].firstH2 }}</h2>
      <div class="inputs">
        <input type="text" name="encrypt" v-model="encryptMessage" @input="validateEncrypt()">
        <button @click="encryptText()">{{ texts[language].encrypt }}</button>
      </div>
      <div v-show="encryptedMessage" class="message_encrypted">
        <div v-for="(row, rowIndex) in encryptedMessage" :key="rowIndex" class="row">
          <span v-for="(item, colIndex) in row" :key="colIndex">
            {{ item }}
          </span>
        </div>
      </div>
    </section>
    <section>
      <h2>{{ texts[language].secondH2 }}</h2>
      <div class="column">
        <div v-for="(row, rowIndex) in decryptMessage" :key="rowIndex" class="row">
          <div v-for="(item, colIndex) in row" :key="colIndex">
            <input type="text" v-model="decryptMessage[rowIndex][colIndex]" :data-row="rowIndex" :data-col="colIndex"
              @input="validateDecrypt(rowIndex, colIndex)"
              @keydown.enter.prevent="moveToNextInput($event, rowIndex, colIndex)">
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="addColumn">{{ texts[language].addColumn }}</button>
        <button @click="removeColumn">{{ texts[language].removeColumn }}</button>
      </div>
      <button @click="decryptText()">{{ texts[language].decrypt }}</button>
      <div v-show="decryptedMessage" class="message_decrypted">
        ❝ {{ decryptedMessage }} ❞
      </div>
    </section>
  </main>
  
  <button id="toggleLanguage" @click="language = language === 'en' ? 'pt' : 'en'">{{ texts[language].change }}</button>
  <footer>
    {{ texts[language].made }} <a href="https://m4thewz.github.io" target="_blank">Matheus Pacheco</a>, Yara e Yuki
  </footer>
</template>

<script src="@/crypto.js"></script>

<style src="@/style.css" />