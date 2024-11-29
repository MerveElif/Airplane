PEOJEYE AİT ÖRNEK EKRAN GÖRÜNTÜLERİ --> /public/myproject dosyasında verilmiştir.

Projede Yapılanlar :

1- İlk 10 koltuk doludur seçilemez.

2- Dolu koltuklar için verdiğimiz API linkinden isim soyisim verisi çekilip hover durumunda tooltip olarak gösterilmelidir. (https://jsonplaceholder.typicode.com/users)

3- En fazla 3 yolcu için koltuk seçimi yapılmalıdır. Daha fazla seçildiğinde kırmızı uyarı çıkmaktadır.

4- Her bir koltuk seçimi yapıldığında ücreti anlık olarak yan kısımda hesaplanmalıdır. (Her bir koltuk 1.000 TL olarak hesaplanmalıdır.)

5- Dolu koltuklar seçilemez css lerle desteklenmiştir.

6- Sayfa yenilendiğinde koltuk seçimleri sabit kalmıştır.

7- İlk koltuk seçiminden sonra 30 saniye tepkisiz kalınırsa “Eğer 20 saniye boyunca devam tuşuna basmassanız seçili verileriniz silinecektir” uyarısı verilmiştir halen bir işlem yoksa sayfayı yenilenip seçimler sıfırlanır. 30 saniye boyunca mouse un o sayfada hareket etmemesi gerekmektedir.

8- Input alanları boş geçilmeyerek form kontrolü yapılmalıdır.

9- Son aşamada işlemleri tamamla butonuna tıklanıldığında rezervasyon işleminin başarılı olduğuna dair bir uyarı mesajı verdirilmelidir.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
