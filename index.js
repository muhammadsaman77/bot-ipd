const { Builder, By, Key, until } = require("selenium-webdriver");

// Fungsi utama untuk menjalankan skrip
async function runScript(data) {
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
  let surveys = [
    "DO13",
    "DO24",
    "DO33",
    "DO44",
    "DO54",
    "DO63",
    "DO73",
    "DO83",
    "DO94",
  ];

  for (let kuesDosen of data) {
    await driver.get("https://siakad.itk.ac.id/ipd_kuesionermk.php");
    let locator = By.css(
      `select#dosen_kuesioner option[value="${kuesDosen.dosen}"]`
    );

    let optionElement = await driver.findElement(locator);
    await optionElement.click();
    for (let survey of surveys) {
      let soal = await driver.findElement(By.id(survey));
      soal.click();
    }

    let komenField = await driver.findElement(By.id("txtKomentar"));
    await komenField.sendKeys(data[0].komen);
    let ckbox = await driver.findElement(By.id("chkPermanent"));
    await ckbox.click();
    let locatorButton = By.css(`input[value="SIMPAN"]`);
    let submit = await driver.findElement(locatorButton);
    await submit.click();
  }
}
let data = [
  {
    dosen: "ipd_kuesionerdosen.php?nip=199008312020121002&mk=IF14132020B",
    komen:
      "Terima kasih atas komitmen Anda dalam membimbing kami dalam memahami tentanng sistem basis data dengan baik.",
  },
  {
    dosen: "ipd_kuesionerdosen.php?nip=199202202019031013&mk=IF14142020B",
    komen:
      "Terima kasih atas komitmen Anda dalam membimbing kami dalam memahami mata kuliah grafika komputer dengan baik.",
  },
  {
    dosen: "ipd_kuesionerdosen.php?nip=199205182019031015&mk=IF14152020B",
    komen:
      "Terima kasih atas komitmen Anda dalam membimbing kami dalam memahami analisis dan perancangan perangkat lunak dengan baik.",
  },
  {
    dosen: "ipd_kuesionerdosen.php?nip=100118160&mk=IF14262020B",
    komen:
      "Terima kasih atas komitmen Anda dalam membimbing kami dalam memahami startup digital lanjutan dengan baik.",
  },
  {
    dosen: "ipd_kuesionerdosen.php?nip=100320228&mk=KU11082020C",
    komen:
      "Terima kasih atas komitmen Anda dalam membimbing kami dalam memahami mata kuliah kewarganegaraan dengan baik.",
  },
];
// Menjalankan skrip
runScript(data);
