# CRUD para el endpoint de contactos `contacts`

Se tomó este reto técnico desde dos perspectivas:
    1.  Reto tecnico: La arquitectura técnica es utilizar typescript, Material UI, react hook forms.
    2.  Entendimiento de requerimientos: Entendimiento del negocio que es la administración de contactos por medio de una API Rest. 

Se instalaron las dependencias y paquetería necesaria comenzar con el desarrollo del CRUD (`Create, Read, Update and Delete`). Posteriorenmetne Se instalo la paquetería para el manejo de estilos requeridos: Material UI y react hook forms y axios para las llamadas a los endpoints de backend. 
Con esto se tenia completo la configuración y base inicial del proyecto, conforme a la arquitectura solicitada 
E inicie con la investigación de la integración y funcionamiento de Material UI, React hook forms; y una vez entendí en esencia para que sirven comencé con el desarrollo:

    1. Empece por el formulario para registrar contactos nuevos que integre con material UI y las propiedades baiscas de react-hook-form.
    2. Lo siguiente que hice fue crear del componente para visualizar toda la lista de contactos.
    3. Y por ultimo cree un componente para actualizar contactos.
    4. La funcionalidad del delete dentro del componente: `Contat¡.tsx` la puedo hacer en el mismo componente; pero ya no lo pude implementar por tiempos

Una vez que ya tuve la funcionalidad completa de los componentes, es decir que realizaba el CRUD completo, realice una refactorización de código con mejoras en los componentes por ejemplo:
    
    * En lugar de utilizar dos formularios, uno para agregar el contacto y otro para actualizar; decidí hacer un solo componente que realice el post y put porque los campos y validaciones son exactamente las mismas para ambos casos. No tenia sentido tener componentes separados. Y con esto me ayudo a codificar una sola vez las validaciones del mail y del teléfono.
    * Cree un archivo para hacer constantes las rutas que estaba utilizando de forma hardcodeada, por si se tuviera que hacer cambio en las rutas, fuera mas fácil de hacerlo desde las constantes globales del proyecto. En vez de modificar muchos archivos solo se modifica uno solo.

Para finalizar el proyecto lo que hice fue deployarlo a githubPages. Para ver el proyecto haz clic aquí:
s[CRUD](https://lexyfeer.github.io/reto-backbone/).
