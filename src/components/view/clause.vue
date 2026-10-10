<template>
  <div class="content-wrapper">
    <header-top :title='$t("terms-and-conditions")' :back="true" showBack></header-top>
    <div class='content'>
      <p class='title'>TÉRMINOS Y POLÍTICAS</p>
      <p>
        Política de privacidadCondiciones y políticasCondiciones de usoPolítica de entradasPolítica de códigos
        promocionalesCondiciones de tarjetas regaloCookies y seguimientoPolítica de VuduCondiciones del programa
        FanRewards
        Estos Términos y Políticas de Fandango (los "Términos y Políticas de Fandango") fueron actualizados por última
        vez el: 5 de julio de 2023. Cuando decimos "nuestro", "nos", "nosotros" o "Fandango" en estos Términos y
        Políticas de Fandango, nos referimos a Fandango Media, LLC o sus subsidiarias. Estas Condiciones y Políticas de
        Fandango se aplican a los sitios web y aplicaciones que operan bajo las marcas Fandango, Vudu, Rotten Tomatoes,
        Flixster, Movieclips, Movies.com, Activaterewards.com, MovieTickets.com o M-GO u otras marcas de nuestra
        propiedad, así como a aquellos de nuestros sitios web, aplicaciones, correos electrónicos y otras comunicaciones
        que enlacen o hagan referencia a estas Condiciones y Políticas de Fandango, o a los demás servicios prestados a
        través de cualquiera de estos medios (los "Servicios").
      </p>
      <p>
        Ocasionalmente, podemos revisar estos Términos y Políticas de Fandango. Puede determinar cuándo se revisaron por
        última vez estas Condiciones y Políticas de Fandango consultando la parte superior de esta página. Cualquier
        cambio en las Condiciones Generales de Fandango entrará en vigor tras la publicación de las Condiciones
        Generales de Fandango revisadas en Internet, accesibles a través de los Servicios, a menos que se indique lo
        contrario. Si continúa utilizando los Servicios después de dichos cambios, se considerará que acepta dichos
        cambios. Si no está de acuerdo con los términos de estos Términos y Políticas de Fandango, tal y como puedan ser
        modificados de vez en cuando, por favor no compre películas de Fandango ni continúe utilizando los Servicios. En
        la medida en que un árbitro o un tribunal de la jurisdicción aplicable determinen que la aplicación de cualquier
        cambio a estos Términos y Políticas de Fandango convertiría a éste en un contrato ilusorio o inaplicable, dichos
        cambios serán aplicables únicamente de forma prospectiva, con respecto a hechos o circunstancias que ocurran
        después de la fecha de dichos cambios.
        Los Términos y Políticas de Fandango consisten en:
      </p>
      <p>Privacy Política</p>
      <p>Terms de Uso</p>
      <p>Ticket Política</p>
      <p>Cookies y Centro de Información sobre Tecnologías de Seguimiento</p>
      <p>Vudu Política</p>
      <p>Promo Política de códigos</p>
      <p>Gift Condiciones de la tarjeta</p>
      <p>FanRewards Condiciones del programa</p>
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
