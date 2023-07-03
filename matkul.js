const { Builder, By, Key, until } = require("selenium-webdriver");

// Fungsi utama untuk menjalankan skrip
async function runScript() {
  // Membuat instance driver
  let driver = await new Builder().forBrowser("chrome").build();

  // Navigasi ke halaman web
  await driver.get("https://gerbang.itk.ac.id");

  let emailField = await driver.findElement(By.id("userid"));
  await emailField.sendKeys("11211052");
  let passwordField = await driver.findElement(By.id("password"));
  await passwordField.sendKeys("18Januari03");
  let button = await driver.findElement(By.className("btn"));
  await button.click();
  let kartu = await driver.findElement(By.className("kartu"));
  await kartu.click();
  await driver.executeScript("window.open()");

  // Menggunakan handle window untuk beralih ke tab baru
  let handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[1]);

  // Lakukan tindakan di tab baru (misalnya, navigasi ke halaman lain)
  await driver.get("https://siakad.itk.ac.id/ipd_kuesionermk.php");
  let option = ["KU11082020"];
  let locator = By.css(`select#mk_kuesioner option[value=${option[0]}]`);
  let optionElement = await driver.findElement(locator);
  await optionElement.click();
  let surveys = [
    "MK13",
    "MK24",
    "MK33",
    "MK44",
    "MK54",
    "MK63",
    "MK73",
    "MK83",
    "MK94",
    "MK104",
  ];

  for (let survey of surveys) {
    let soal = await driver.findElement(By.id(survey));
    soal.click();
  }
  let komentar =
    "Mata kuliah Kewarganegaraan adalah mata kuliah yang sangat penting dalam membentuk pemahaman dan kesadaran saya sebagai seorang warga negara";
  let komenField = await driver.findElement(By.id("txtKomentar"));
  await komenField.sendKeys(komentar);
  let ckbox = await driver.findElement(By.id("chkPermanent"));
  await ckbox.click();
  let locatorButton = By.css(`input[value="SIMPAN"]`);
  let submit = await driver.findElement(locatorButton);
  await submit.click();
}

// Menjalankan skrip
runScript();
