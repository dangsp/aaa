<template>
  <div class="content-wrapper">
    <header-top :title='$t("assist")' :back="true" showBack></header-top>
    <div class='content'>
      <p class='title'>
        Contáctanos SERVICIO AL CLIENTE
      </p>
      <p>
        Visita Acerca de Rotten Tomatoes® para obtener más información sobre el Tomatometer® y el equipo detrás
        de
        él.
      </p>
      <p> Para obtener respuestas rápidas a preguntas comunes sobre nuestro sitio, visita nuestras Preguntas
        Frecuentes.</p>
      <p> ¿Todavía tienes preguntas o deseas enviar una solicitud de edición de datos de películas o programas de
        televisión? Contáctanos a través de nuestro Formulario de Correo Electrónico.</p>
      <p class='title'>
        SOLICITUDES DE EDICIÓN
      </p>
      <p>
        Cuéntanos sobre la información faltante o incorrecta de una película o programa de televisión enviando
        una
        solicitud a través de nuestro Formulario de Correo Electrónico.
      </p>
      <p>
        ¿Nos falta una reseña? Revisa nuestros Criterios del Tomatometer para asegurarte de que la publicación y
        el
        crítico estén aprobados antes de enviar una solicitud para agregar una reseña.
      </p>
      <p class='title'>LICENCIAMIENTO</p>
      <p>
        ¿Estás interesado en mostrar un logotipo con derechos de autor de Rotten Tomatoes en material de
        marketing o
        en tu sitio/aplicación? Revisa nuestras Pautas de Uso de la Marca y luego envía una solicitud con
        detalles
        sobre cómo se utilizarán los logotipos a través de nuestro Formulario de Propuesta Comercial.
      </p>
      <p>
        Para obtener información sobre cómo integrar los datos de Rotten Tomatoes en tu aplicación (a través de
        APIs, flujos de datos), envía una solicitud con detalles sobre tu aplicación y tu plan de uso de
        nuestros
        datos a través de nuestro Formulario de Propuesta Comercial.
      </p>
      <p class='title'>
        ASOCIACIONES
      </p>
      <p>
        Si tu empresa está interesada en asociarse con nosotros, completa nuestro Formulario de Propuesta
        Comercial
        con más detalles.
      </p>

      <p class='title'>PUBLICIDAD</p>
      <p> ¿Quieres hacer publicidad en Rotten Tomatoes, Flixster o Fandango? Obtén más información en la página de
        Publicidad de Fandango. Puedes enviar una solicitud allí para que un representante de ventas de Fandango
        se
        comunique contigo.</p>
      <p class='title'>
        SOMETER CRÍTICAS O PUBLICACIONES
      </p>
      <p>
        Las reseñas de películas y programas de televisión utilizadas para calcular el Tomatometer provienen de
        publicaciones o críticos individuales seleccionados por el equipo de Rotten Tomatoes.
      </p>
      <p>
        ¿Estás interesado en agregarte como crítico o tu publicación como fuente? Revisa nuestros Criterios del
        Tomatometer para determinar si eres elegible. Si eres elegible, las instrucciones para postularte
        también se
        enumeran en la página.
      </p>
      <p class='title'>CONTACTOS DE PRENSA</p>
      <p>Para consultas de prensa, comunícate con el equipo de relaciones públicas de Fandango a través de
        pr@fandango.com.</p>
      <p class='title'>OPORTUNIDADES DE CARRERA</p>
      <p>
        ¿Interesado en unirte a la familia de Fandango? Obtén información sobre una emocionante carrera con
        nosotros
        visitando nuestra página de Carreras.
      </p>
      <p>ASUNTOS LEGALES</p>
      <p>Para consultas legales, dirige la correspondencia a:</p>
      <p>Fandango, ATTN: Departamento Legal</p>
      <p>407 North Maple Dr.</p>
      <p>Suite 300</p>
      <p>Beverly Hills, CA 90210</p>
      <p>Ten en cuenta que Rotten Tomatoes no puede otorgar permisos para reutilizar sus fotos, portadas de video o
        reseñas para informes escolares, artículos de noticias o similares.</p>
      <p>Para la reutilización de marcas comerciales a través del programa de Licencias de Rotten Tomatoes, revisa
        más detalles aquí.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "cookie",
  mounted() {
    _ResizeContent.init();
  },

}
</script>
<style scoped lang='scss'>
.content-wrapper {
  overflow-y: auto;
  height: 100vh;
}

.content {
  margin: 0 auto 50px;
  color: #595959;
  font-size: 15px;
  line-height: 2;
  padding: 0.24rem;
  font-weight: 400;

  .content-title {
    font-weight: bold;
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #595959;
    font-size: 15px;
    line-height: 2;
    font-weight: 400;
  }

  .title {
    font-size: 20px;
    padding: 0 0 0 5px;
    margin: 10px 0;
  }
}
</style>
