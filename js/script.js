$( function() {
  /* mask cpf */
  $('.cpf').mask('000.000.000-00');

  /* mask phone */
  $('.phone').mask('(00) 0000-00000');
  $('.phone').blur( function() {
    if ( $(this).val().length == 15 )
    {
      $('.phone').mask('(00) 00000-0000');
    }
    else
    {
      $('.phone').mask('(00) 0000-0000');
    }
  });

  /* consult states and cities */
  let states = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';

  $.getJSON(states, { id: 10 }, function(data) {
    let opt = '<option>Selecione o estado</option>';

    data.sort( function(a, b) {
      if ( a.nome < b.nome )
      {
        return -1;
      }
      else
      {
        return true;
      }
    });

    for( let i = 0; i < data.length; i++ )
    {
      opt += '<option data-id="'+ data[i].id + '" value="' + data[i].nome + '">' + data[i].nome + '</option>'; 
    }

    $('select[name="state"]').html(opt);
  });

  $('select[name="state"]').change( function() {
    if( $(this).val() )
    {
      $.getJSON(states + $(this).find('option:selected').attr('data-id') + '/municipios', { id: $(this).find('option:selected').attr('data-id') }, function(data) {
        let opt = '<option>Selecione a cidade</option>';

        for( let i = 0; i < data.length; i++ )
        {
          opt += '<option value="' + data[i].nome + '" >' + data[i].nome + '</option>';
        }

        $('select[name="city"]').html(opt);
      });
    }
    else
    {
      $('select[name="city"]').html('<otion>Selecione a cidade</option>')
    }
  });
});