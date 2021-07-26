# API REST ou RESTFull
_Estado de representação de recurso(endpoint), usando uma de varios formatos em Javascript por HTTP: JSON(Javascript Object Notation), HTML, XLT, Python, PHP ou texto sem formatação._

###  O QUE É UMA RESTAPI?
_Api na qual se utilizam verbos HTTP para requisitar e enviar e compartilhar dados entre servidores e clientes (server-side and client-side)._

### O QUE É NECESSÁRIO ṔARA SER CONSIDERADA UMA API REST & RESTFull?
 * ### Arquitetura cliente-servidor: a arquitetura REST é composta por clientes, servidores e recursos. Ela lida com as solicitações via HTTP.

* ### Sem monitoração de estado: nenhum conteúdo do cliente é armazenado no servidor entre as solicitações. Em vez disso, as informações sobre o estado da sessão são mantidas com o cliente.

* ### Capacidade de cache: o armazenamento em cache pode eliminar a necessidade de algumas interações entre o cliente e o servidor.
  
* ### Sistema em camadas: as interações entre cliente e servidor podem ser mediadas por camadas adicionais. Essas camadas podem oferecer recursos extras, como balanceamento de carga, caches compartilhados ou segurança.

* ### Código sob demanda (opcional): os servidores podem ampliar a funcionalidade de um cliente por meio da transferência de códigos executáveis.

* ### Interface uniforme: essa restrição é essencial para o design de APIs RESTful e inclui quatro vertentes:

1.  _Identificação de recursos nas solicitações: os recursos são identificados nas solicitações e separados das representações retornadas para o cliente._

2. _Manipulação de recursos por meio de representações: os clientes recebem arquivos que representam recursos. Essas representações precisam ter informações suficientes para permitir a modificação ou exclusão._

3. _Mensagens autodescritivas: cada mensagem retornada para um cliente contém informações suficientes para descrever como ele deve processá-las._

4. _Hipermídia como plataforma do estado das aplicações: depois de acessar um recurso, o cliente REST pode descobrir todas as outras ações disponíveis no momento por meio de hiperlinks._



### QUAIS OS PRINCIPAIS VERBOS?
* GET
* POST
* PATCH
* DELETE
  
_Dessa forma pode construir uma aplicação sem necessariamente ter um dispositivo fixo para acessar e consumir a aplicação;_


