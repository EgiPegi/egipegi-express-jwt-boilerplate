# Contoh Express Typescript JWT + Refresh Token dengan MongoDB

Ini adalah contoh implementasi mekanisme autentikasi JSON Web Token (JWT) dengan menggunakan mekanisme refresh token di aplikasi Express.

## Fitur

- Registrasi pengguna baru
- Otentikasi dengan access token
- Refresh token untuk memperbarui access token

## Penggunaan

1. Instalasi depedensi:

```
npm install
```

atau

```
yarn install
```

2. Konfigurasi .env:

Salin berkas `.env.example` menjadi `.env` dan atur konfigurasi yang sesuai.

3. Jalankan Aplikasi untuk proses development:

```
npm run dev
```

atau

```
yarn dev
```

4. Registrasi Pengguna:

- Endpoint: `POST /auth/register`
- Contoh permintaan:
  ```json
  {
    "username": "egipegi",
    "password": "password123",
    "role": "admin"
  }
  ```

5. Masuk (Login) Pengguna:

- Endpoint: `POST /auth/login`
- Contoh permintaan:
  ```json
  {
    "username": "egipegi",
    "password": "password123"
  }
  ```
- Respon:
  ```json
  {
    "token": "access_token",
    "refreshToken": "refresh_token"
  }
  ```

7. Kompilasi TypeScript ke JavaScript :

TypeScript adalah bahasa yang dikompilasi, artinya kode TypeScript Anda harus diubah menjadi kode JavaScript sebelum dapat dijalankan oleh mesin Node.js atau browser. Proses ini dilakukan dengan menggunakan kompiler TypeScript.

```bash
npx tsc
```

Setelah kompilasi selesai, berkas JavaScript hasil kompilasi akan ada dalam direktori yang telah tentukan sebagai `"outDir"` dalam `tsconfig.json`.

Kemudian jalankan

```bash
yarn start
```

atau

```bash
npm start
```

untuk menjalankan aplikasi

## Catatan

Pastikan untuk mengganti nilai `process.env.JWT_SECRET` dengan secret key yang sesuai yang Anda gunakan dalam aplikasi Anda.

Dokumentasi ini hanya memberikan contoh implementasi mekanisme refresh token dalam aplikasi Express. Anda perlu memperhatikan aspek keamanan seperti HTTPS, perlindungan terhadap serangan CSRF, dan lain-lain dalam pengembangan aplikasi produksi.

---

Dibuat dengan 💙 oleh EgiPegi
