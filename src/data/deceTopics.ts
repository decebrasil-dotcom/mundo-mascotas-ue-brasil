import { DeceTopic } from '../types';

export const DECE_TOPICS: DeceTopic[] = [
  {
    id: 'que-es-el-dece',
    title: '¿Qué es el DECE?',
    summary: 'El Departamento de Consejería Estudiantil es un espacio seguro y confidencial dentro de tu escuela.',
    mascotId: 'miau',
    content: [
      {
        heading: 'Un equipo de profesionales que te cuida y apoya',
        paragraphs: [
          'El DECE (Departamento de Consejería Estudiantil) de la Unidad Educativa Brasil está formado por profesionales en psicología y trabajo social dedicados a velar por tu bienestar integral, tu desarrollo emocional y tu seguridad.',
          'No es un lugar de castigo ni donde van los estudiantes con problemas; es un refugio cálido donde puedes conversar, desahogarte, resolver dudas y encontrar herramientas para sentirte bien contigo mismo y con los demás.',
        ],
        tips: [
          'Todo lo que hablas en el DECE se maneja con respeto y confidencialidad.',
          'Puedes acudir solo o acompañado de un amigo, docente tutor o tus padres.',
        ],
      },
    ],
    quiz: {
      question: '¿Para qué existe el DECE en la Unidad Educativa Brasil?',
      options: [
        'Para castigar a quienes no hacen la tarea.',
        'Para brindar apoyo emocional, orientación y escuchar a los estudiantes en un espacio seguro.',
        'Para revisar mochilas únicamente.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Exacto! El DECE es tu espacio de confianza, orientación y bienestar emocional.',
    },
  },
  {
    id: 'cuando-acudir',
    title: '¿Cuándo puedo acudir al DECE?',
    summary: 'No necesitas esperar a que algo sea muy grave; cualquier momento es bueno si necesitas ser escuchado.',
    mascotId: 'guao',
    content: [
      {
        heading: 'Situaciones en las que el DECE te acompaña',
        paragraphs: [
          'A veces pensamos que solo debemos buscar ayuda cuando ya no aguantamos más. ¡Pero no es así! Puedes acudir al DECE siempre que lo sientas necesario.',
        ],
        tips: [
          'Si te sientes triste, ansioso, con rabia o confundido sin saber por qué.',
          'Si estás pasando por una situación difícil en tu hogar o con tus amigos.',
          'Si te cuesta concentrarte en clases o tienes desmotivación escolar.',
          'Si alguien te está molestando o sientes que tu seguridad está en riesgo.',
          'Si simplemente necesitas un consejo o una palabra de aliento.',
        ],
      },
    ],
    quiz: {
      question: '¿Cuándo es el momento adecuado para pedir ayuda al DECE?',
      options: [
        'Solo cuando ya es una emergencia extrema.',
        'En cualquier momento en que sientas tristeza, duda, preocupación o necesidad de apoyo.',
        'Nunca, es mejor quedarse callado.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Muy bien! Acudir a tiempo previene problemas mayores y te ayuda a sentirte aliviado.',
    },
  },
  {
    id: 'convivencia-escolar',
    title: 'Convivencia Escolar Armónica',
    summary: 'Cómo construir un ambiente de paz, respeto y compañerismo en cada rincón del colegio.',
    mascotId: 'bibi',
    content: [
      {
        heading: 'La magia del respeto cotidiano',
        paragraphs: [
          'La escuela es como una gran colmena donde todos nos necesitamos. Para que los días sean agradables, la clave es la empatía: ponerse en los zapatos de la otra persona antes de hablar o actuar.',
          'El respeto no solo se demuestra a los profesores, sino entre iguales: al prestar un útil, al jugar en el patio y al escuchar las opiniones de los demás.',
        ],
        tips: [
          'Usa palabras amables y evita apodos que puedan herir a alguien.',
          'Si surge un desacuerdo, habla con tranquilidad sin gritar ni agredir.',
          'Respeta los turnos para hablar y los espacios compartidos.',
        ],
      },
    ],
    quiz: {
      question: '¿Cuál es la base fundamental para una buena convivencia escolar?',
      options: [
        'Gritar más fuerte para ganar las discusiones.',
        'El respeto mutuo, la empatía y la comunicación asertiva.',
        'Ignorar a todos los compañeros.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Excelente! Ponerse en el lugar del otro crea una escuela donde todos somos felices.',
    },
  },
  {
    id: 'bullying',
    title: 'Prevención del Bullying',
    summary: 'Aprende a reconocer el acoso escolar y cómo detenerlo juntos con valentía y solidaridad.',
    mascotId: 'kiro',
    content: [
      {
        heading: '¿Qué es y qué no es bullying?',
        paragraphs: [
          'Una discusión ocasional entre amigos es un conflicto común. Pero el bullying (acoso escolar) es una conducta intencional, repetida en el tiempo y donde existe un desequilibrio de poder que causa daño físico, verbal o psicológico a un estudiante.',
          'Callar o reírse de las burlas nos convierte en cómplices pasivos. Romper el silencio es la forma más poderosa de proteger a nuestros compañeros.',
        ],
        tips: [
          'No te quedes callado: avisar a un adulto de confianza NO es ser chismoso, es salvar y proteger.',
          'Acércate a la persona afectada y demuéstrale que no está sola.',
          'Reporta la situación de inmediato a tu docente tutor, inspector o al DECE de la escuela.',
        ],
      },
    ],
    quiz: {
      question: 'Si ves que a un compañero lo están acosando repetidamente, ¿qué debes hacer?',
      options: [
        'Grabar con el celular y reírme con los demás.',
        'Avisar de inmediato a un docente o al DECE para proteger a mi compañero.',
        'No meterme porque no es mi problema.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Brillante! Informar a las autoridades escolares protege la vida y dignidad de tus compañeros.',
    },
  },
  {
    id: 'ciberacoso',
    title: 'Ciberacoso y Uso Seguro de Redes',
    summary: 'Cómo cuidar tu huella digital y prevenir el acoso en grupos de WhatsApp o redes sociales.',
    mascotId: 'kiro',
    content: [
      {
        heading: 'El mundo digital también requiere respeto y cuidado',
        paragraphs: [
          'El ciberacoso ocurre cuando se utilizan teléfonos, mensajes, redes sociales o videojuegos para intimidar, amenazar o avergonzar a otra persona.',
          'Detrás de cada pantalla hay una persona real con sentimientos. Lo que escribes en internet permanece y tiene consecuencias reales.',
        ],
        tips: [
          'Nunca compartas fotos íntimas ni contraseñas con nadie.',
          'No reenvíes memes, audios o capturas que se burlen de un compañero.',
          'Si recibes mensajes amenazantes: no respondas, toma captura de pantalla y muéstraselo a tus padres o al DECE.',
        ],
      },
    ],
    quiz: {
      question: '¿Qué debes hacer si alguien envía una foto o mensaje ofensivo en un grupo escolar de chat?',
      options: [
        'Reenviarla a otros amigos para que se rían.',
        'No compartirla, pedir respeto o salir del grupo y mostrar la evidencia a un adulto responsable.',
        'Responder con más insultos.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Exacto! Cortar la cadena de burlas y buscar apoyo adulto frena el ciberacoso.',
    },
  },
  {
    id: 'manejo-emociones',
    title: 'Manejo Saludable de Emociones',
    summary: 'Todas las emociones son naturales: la clave es aprender a sentirlas y expresarlas sin lastimarnos.',
    mascotId: 'tuki',
    content: [
      {
        heading: 'No hay emociones "malas", solo formas de gestionarlas',
        paragraphs: [
          'Sentir rabia, tristeza, miedo o frustración es 100% normal y forma parte de ser humanos. La diferencia está en lo que decidimos hacer cuando sentimos esa emoción.',
          'Cuando la rabia o la ansiedad se apoderan de ti, actuar de golpe puede herir a otros o traerte problemas. La técnica de Tuki la tortuga te invita a parar y respirar.',
        ],
        tips: [
          'Ponle nombre a lo que sientes: "¿Es miedo? ¿Es tristeza? ¿Es enojo?".',
          'Respira profundamente: inhala en 4 segundos, sostén 4 y exhala en 4 segundos.',
          'Dibuja, escribe o camina un momento para calmar la mente antes de hablar.',
        ],
      },
    ],
    quiz: {
      question: '¿Qué es lo más saludable cuando sientes mucha rabia o frustración?',
      options: [
        'Gritarle a quien esté cerca o tirar objetos.',
        'Hacer una pausa, respirar hondo para serenarte y expresar lo que te molestó con calma.',
        'Guardarte el enojo para siempre sin decírselo a nadie.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Muy bien! Respirar y calmarse permite solucionar las cosas sin causar daño.',
    },
  },
  {
    id: 'inclusion-diversidad',
    title: 'Inclusión y Respeto a las Diferencias',
    summary: 'Cada persona tiene un ritmo, origen y talentos únicos que enriquecen nuestra comunidad.',
    mascotId: 'lumi',
    content: [
      {
        heading: 'Celebrando lo que nos hace especiales',
        paragraphs: [
          'En la Unidad Educativa Brasil compartimos estudiantes con diferentes habilidades, culturas, formas de pensar y estilos de aprendizaje. Ninguna es mejor que otra; cada una aporta color a la escuela.',
          'La verdadera inclusión significa asegurarnos de que nadie se sienta excluido en los juegos, los trabajos grupales o las conversaciones.',
        ],
        tips: [
          'Sé paciente si a un compañero le toma más tiempo comprender una lección.',
          'Aprende de las tradiciones y costumbres de compañeros de otras regiones.',
          'Adapta los juegos para que todos puedan participar activamente.',
        ],
      },
    ],
    quiz: {
      question: '¿Qué significa ser una escuela inclusiva?',
      options: [
        'Obligar a todos a pensar exactamente igual.',
        'Aceptar, respetar y valorar a cada estudiante sin importar sus diferencias o capacidades.',
        'Separar a los que aprenden diferente en otro patio.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Excelente! La inclusión nos hace crecer como personas más empáticas y justas.',
    },
  },
  {
    id: 'seguridad-autocuidado',
    title: 'Seguridad y Autocuidado',
    summary: 'Pautas para cuidar tu cuerpo, tu integridad personal y prevenir riesgos en el colegio y la calle.',
    mascotId: 'kiro',
    content: [
      {
        heading: 'Tu cuerpo es tu tesoro y merece respeto absoluto',
        paragraphs: [
          'Nadie tiene derecho a tocarte de manera que te haga sentir incómodo, culpable o temeroso. Los secretos que te hacen sentir mal o asustado no se deben guardar nunca.',
          'En la escuela y en la calle, prestar atención a las normas de seguridad previene accidentes graves.',
        ],
        tips: [
          'Aprende la regla del traje de baño: las partes íntimas nadie las debe tocar ni mirar.',
          'Si alguien te pide guardar un "secreto incómodo", cuéntaselo de inmediato a tus padres o al DECE.',
          'Camina por lugares iluminados y no aceptes traslados ni dulces de desconocidos.',
        ],
      },
    ],
    quiz: {
      question: 'Si alguien te pide guardar un secreto que te hace sentir incómodo o asustado, ¿qué debes hacer?',
      options: [
        'Guardar el secreto porque me lo pidieron.',
        'Romper el secreto y contárselo de inmediato a mis padres, docentes o profesionales del DECE.',
        'Olvidarme del tema y no hacer nada.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Totalmente correcto! Ningún secreto que te cause miedo debe guardarse. ¡Habla siempre!',
    },
  },
  {
    id: 'pedir-ayuda',
    title: 'Cómo y a Quién Pedir Ayuda',
    summary: 'Los pasos claros para acercarte a un adulto responsable de la Unidad Educativa Brasil.',
    mascotId: 'guao',
    content: [
      {
        heading: 'Ruta segura dentro de nuestra institución',
        paragraphs: [
          'Pedir ayuda es un derecho y una muestra de valentía. Si estás pasando por un momento difícil o ves a alguien en peligro, existen personas capacitadas dentro del colegio listas para intervenir.',
        ],
        tips: [
          'Paso 1: Acércate a tu docente tutor o a cualquier profesor con quien sientas confianza.',
          'Paso 2: Dirígete directamente a la oficina del DECE en el plantel escolar.',
          'Paso 3: También puedes acudir a los inspectores generales o directivos del plantel.',
          'Recuerda: No te quedes solo con una preocupación. ¡Estamos aquí para ti!',
        ],
      },
    ],
    quiz: {
      question: '¿A quiénes puedes acudir en la escuela si necesitas ayuda o apoyo emocional?',
      options: [
        'A nadie, los profesores solo dan clases.',
        'A tus docentes de confianza, autoridades y al equipo profesional del DECE.',
        'Solo a extraños de internet.',
      ],
      correctAnswerIndex: 1,
      explanation: '¡Así es! Todo el personal docente y del DECE está preparado para protegerte y guiarte.',
    },
  },
];
