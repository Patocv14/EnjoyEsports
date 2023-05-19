import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"Enjoy Esports" <enjoyEsports@enjoyesports.com>',
    to: email,
    subject: "Enjoy - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en Enjoy Esports",
    html: `<p>Hola ${nombre}, comprueba tu cuenta en Enjoy Esports</p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprueba tu Cuenta</a>

      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"Enjoy Esports" <enjoyEsports@enjoyesports.com>',
    to: email,
    subject: "Enjoy - Reestablce tu Password",
    text: "Reestablce tu Password en Enjoy Esports",
    html: `<p>Hola ${nombre}, reestablce tu password en Enjoy Esports</p>
      <p>Sigue el siguiente enlace para generar un nuevo password: </p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>

      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `,
  });
};
