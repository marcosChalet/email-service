# Email Service

Um serviço robusto em Node.js dedicado ao envio eficiente e confiável de emails.

## Pré-requisitos

Antes de prosseguir, assegure-se de que você tenha o Docker instalado em sua máquina. Se precisar de orientações sobre a instalação, consulte o [manual de instalação do Docker](https://docs.docker.com/engine/install/).

## Como Iniciar

Para executar o serviço, siga os passos abaixo:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/email-service.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd email-service
   ```
   Agora, o serviço de envio de emails estará em execução e pronto para ser utilizado.

3. Crie um arquivo na raiz chamado .env.local e modifique as configurações de acordo com os dados requisitados. Utilize o exemplo fornecido em .env.template como referência.

4. Inicie o serviço utilizando o Docker Compose:   
   ```bash
   docker-compose up -d
   ```
   
## Testando

Agora você já está pronto para testar serviço... Substituia os dados do exemplo para testar o envio de emails

```bash
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{"name": "SeuNome", "email": "seuemail@example.com", "message": "SuaMensagemAqui"}'
```
