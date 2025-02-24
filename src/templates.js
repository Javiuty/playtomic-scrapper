const padelTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pistas Disponibles de Playtomic</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
        }
        .date-section {
            margin: 20px 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        h2 {
            color: #3498db;
            margin-bottom: 10px;
        }
        .slot {
            margin: 10px 0;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 3px;
        }
        .court {
            font-weight: bold;
            color: #2c3e50;
        }
        .time {
            color: #7f8c8d;
        }
        .price {
            color: #27ae60;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #7f8c8d;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Pistas Disponibles - PadelSpirit Club</h1>
        <div id="content">
          {{data}}
        </div>
        <div class="footer">
            <p>Playtomic - ¡Reserva tu pista ahora!</p>
            <p>Precios sujetos a disponibilidad</p>
            <p>Este email se ha generado automáticamente gracias a Escubot</p>
        </div>
    </div>
</body>
</html>
`

const slotsHTML = (datos) => datos.map(slot => {
  return `
    <div class="date-section">
      <h2>${slot.date} - ${slot.center}</h2>
      ${slot.freeSlots.map(freeSlot => {
    return `
          <div class="slot">
            <p class="court">${freeSlot.court}</p>
            <p class="time">${freeSlot.time}</p>
            <p class="price">${freeSlot.duration} - ${freeSlot.price}</p>
          </div>
        `
  }).join('')}
    </div>
  `
})

export const html = (datos) => padelTemplate.replace('{{data}}', slotsHTML(datos).join(''))