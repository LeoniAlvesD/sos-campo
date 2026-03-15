export const acidentes = [

  {
    id: 'trauma_maquina_agricola',
    nome: 'Trauma com máquinas agrícolas',
    descricao: 'Acidente envolvendo tratores, colheitadeiras ou equipamentos agrícolas. Pode resultar em lesões graves e risco à vida, exigindo atendimento profissional imediato.',
    passos: [
      'Se for seguro, desligar a máquina imediatamente',
      'Evitar remover objeto encravado no corpo',
      'Aplicar compressão direta para auxiliar no controle do sangramento',
      'Manter a vítima imóvel até chegada do socorro',
      'Acionar 192 (SAMU) ou 193 (Bombeiros)'
    ],
    naoFazer: [
      'Não tentar retirar partes presas na máquina sem segurança adequada',
      'Não movimentar a vítima sem necessidade',
      'Não remover objetos perfurantes'
    ],
    imagem: require('../assets/images/trauma_maquina.png')
  },

  {
    id: 'hemorragia',
    nome: 'Hemorragia (sangramento intenso)',
    descricao: 'Perda significativa de sangue causada por trauma ou corte. Pode representar risco à vida e exige avaliação profissional.',
    passos: [
      'Aplicar compressão direta com pano limpo ou gaze',
      'Manter compressão contínua até chegada do socorro',
      'Se possível, elevar o membro afetado',
      'Acionar 192 imediatamente em caso de sangramento intenso'
    ],
    naoFazer: [
      'Não remover objetos encravados',
      'Não aplicar substâncias caseiras'
    ],
    imagem: require('../assets/images/hemorragia.png')
  },

  {
    id: 'fratura',
    nome: 'Fraturas',
    descricao: 'Possível quebra ou fissura óssea causada por queda ou impacto. Necessita avaliação médica para confirmação e tratamento adequado.',
    passos: [
      'Evitar movimentar o membro afetado',
      'Imobilizar na posição encontrada com material firme',
      'Aplicar gelo envolto em pano, se disponível',
      'Buscar atendimento médico ou acionar 192'
    ],
    naoFazer: [
      'Não tentar alinhar o osso',
      'Não massagear o local lesionado'
    ],
    imagem: require('../assets/images/fratura.png')
  },

  {
    id: 'queimadura',
    nome: 'Queimaduras',
    descricao: 'Lesão na pele causada por calor, eletricidade ou substâncias químicas. A gravidade deve ser avaliada por profissional de saúde.',
    passos: [
      'Resfriar com água corrente por 10 a 20 minutos',
      'Remover acessórios próximos à área afetada',
      'Cobrir com pano limpo ou gaze',
      'Em casos extensos ou profundos, acionar 192'
    ],
    naoFazer: [
      'Não aplicar pomadas ou substâncias caseiras',
      'Não estourar bolhas'
    ],
    imagem: require('../assets/images/queimadura.png')
  },

  {
    id: 'picada_animais_peconhentos',
    nome: 'Picadas de animais peçonhentos',
    descricao: 'Acidente envolvendo serpentes, escorpiões ou outros animais peçonhentos. Requer atendimento hospitalar imediato.',
    passos: [
      'Manter a vítima calma e em repouso',
      'Lavar o local com água e sabão',
      'Retirar anéis ou objetos apertados próximos',
      'Encaminhar imediatamente ao hospital ou acionar 192'
    ],
    naoFazer: [
      'Não realizar torniquete',
      'Não cortar o local',
      'Não sugar o veneno'
    ],
    imagem: require('../assets/images/picada_peconhento.png')
  },

  {
    id: 'intoxicacao_agrotoxico',
    nome: 'Intoxicação por agrotóxicos',
    descricao: 'Exposição ou ingestão de defensivos agrícolas pode causar sintomas graves e exige orientação médica imediata.',
    passos: [
      'Retirar a pessoa do local contaminado',
      'Remover roupas contaminadas',
      'Lavar a pele com água corrente',
      'Não provocar vômito sem orientação profissional',
      'Levar a embalagem do produto ao hospital',
      'Ligar 0800 722 6001 (Disque-Intoxicação)'
    ],
    naoFazer: [
      'Não oferecer leite ou substâncias caseiras',
      'Não provocar vômito sem orientação médica'
    ],
    imagem: require('../assets/images/intoxicacao.png')
  },

  {
    id: 'choque_eletrico_rural',
    nome: 'Choque elétrico',
    descricao: 'Contato com corrente elétrica pode causar lesões graves e risco à vida, exigindo atendimento médico imediato.',
    passos: [
      'Não tocar na vítima antes de desligar a energia',
      'Utilizar material isolante seco, se necessário',
      'Acionar imediatamente 192'
    ],
    naoFazer: [
      'Não tocar diretamente na vítima enquanto houver energia ativa'
    ],
    imagem: require('../assets/images/choque_eletrico.png')
  },

  {
    id: 'insolacao_desidratacao',
    nome: 'Insolação / Desidratação',
    descricao: 'Exposição excessiva ao calor pode causar mal-estar e complicações. Persistência dos sintomas exige avaliação médica.',
    passos: [
      'Levar para local fresco e sombreado',
      'Oferecer água aos poucos se estiver consciente',
      'Afrouxar roupas',
      'Se houver desmaio ou piora do quadro, acionar 192'
    ],
    naoFazer: [
      'Não deixar a pessoa exposta ao sol',
      'Não oferecer líquidos se estiver inconsciente'
    ],
    imagem: require('../assets/images/insolacao.png')
  }

];