# Alkalmazások fejlesztése beadandó feladat

Készítette: Bagoly Kunigunda, Dorogi Benjamin, Fenyvesi Attila

## Project management tool

### Funkcionális követelmények

A programba kétféle adattípust lehet rögzíteni:
 - feladatokat
 - humán erőforrásokat (dolgozókat)
 
A feladatok részei:
 - A feladatok részfeladatokból állnak.
 - A részfeladatoknak megadható:
   - mik az előfeltételei (más részfeladatok)
   - melyekkel végezhető párhuzamosan
   - mik az erőforrás igényei
 
A dolgozók adatai:
 - személyes adatok (név, cím, beosztás, fizetés, stb.)
 - képességek egy 5-ös skálán (pl.: PHP: 5/5; Java: 3/5; stb.)
 
Egy munkamenet létrehozása után a program megadja, hogy mely dolgozóknak mely részfeladatokon kell dolgozniuk a leghatékonyabb munkavégzés érdekében. A programba a dolgozók a saját azonosítójukkal be tudnak lépni, és az általuk elvégzett részfeladatokat jóvá tudják hagyni, így nyomon követhető a project végrehajtásának a menete.
  
### Nemfunkcionális követelmények

A programmal szemben támasztott alapvető elvárás - a várhatóan széleskörű és változatos felhasználásból eredendően - a platformfüggetlenség. A programnak futnia kell a legnépszerűbb platformokon (Windows, Linux, OS X).

### Szakterületi követelmények

A programnak képesnek kell lennie bármely szakterület projectmenedzselési feladatainak ellátására, így az általános információk (pl. személyes adatok) rögzítésén túl az üzemeltető számára lehetővé kell tenni, hogy a szakterületre jellemző speciális adatokat (pl. dolgozók képességei vagy a részfeladatok erőforrás igényei) személyre szabhassa.

### Szerepkörök

Admin:
 * Mindenhez (is) hozzáfér

Group Leader :
 * Project létrehozás
 * Memberek csoportba vétele
 * Skillek felvétele
 * Feladatok memberekhez rendelése
 * Folyamatok ellenőrzése

Group Member :
 * Saját skillek megadása
 * Feladat elvégzése (log : idő, kész vagy sem)
 * Folyamat megtekintése

### Adatbázis :
 * Users
   * név
   * jelszó
   * skills
 * Groups
   * name
   * Project (by id)
   * members:roles
 * Task
   * required skill
   * assignee
   * prerequisites
   * complete
   * project_id
 * Project
   * group
   * tasks (json)
   * deadline
   * name
 * Skills
   * name
   * code

### Endpointok
 * user/new
   * *createMember(String name,String password,String role,List<Integer> skills) --a skillek id szerint vannak tárolva*
 * user/edit
   * *modifyUser(String newName, String newPassword)*
 * user/addskills
   * *addSkills(List<Integer> skills) --a skillek id szerint vannak tárolva*
 * member/project/tasks
   * *getTasks(User user)*
 * member/project/completeTask
   * *completeTask(Integer duration)*
 * member/project/getStatus
    * *getProjectStatus(Project project)*
 * leader/group/create
   * *createGroup(String groupName,List<User> members)*
 * leader/group/members/add
   * *addGroupMember(Group group,User member)*
 * leader/group/members/remove
   * *removeGroupMember(Group group, User member)*
 * leader/project/new
   * *createProject(Group group,String name)*
   * *createProject(Group group,String name,DateTime deadline)*
 * leader/project/createTask
   * *createTask(Project projectId, List<Integer> requiredSkills,List<Integer> prerequisites) --az előfeltételek id szerint vannak tárolva*
  * leader/project/assigntask
    * *assignTask(Task task,User assignee)*
  * leader/project/calculateoptimal
    * *calcOptimalAssignees(Project project)*
  * leader/project/createSkill
    * *createSkill(String name, Integer code)*
  * leader/project/getStatus
    * *getProjectStatus(Project project)*
 * admin/editusers
   * *editUser(String name, String password, String role, List<Integer> skills)*
 * admin/switchtouserprofile
  * *fogalmam nincs ezt pontosan még hogy fogjuk implementálni*
 
TODO:
{
  "timestamp": "2018-12-09T12:56:50.265+0000",
  "status": 500,
  "error": "Internal Server Error",
  "message": "could not execute statement; SQL [n/a]; constraint [\"UK_39TOQEWEEJPRTSITRJ2SER4RG_INDEX_8 ON PUBLIC.TASK_PREREQUISITES(PREREQUISITES_ID) VALUES (1, 1)\"; SQL statement:\ninsert into task_prerequisites (task_id, prerequisites_id) values (?, ?) [23505-197]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement",
  "path": "/tasks/new"
}

Egy skill-t hozzá tudok adni (az előző szenvedés után), viszont a másodiknál már ezt dobja:
ERROR Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null},"status":500,"statusText":"OK","url":"http://localhost:8080/users/1/skills/add","ok":false,"name":"HttpErrorResponse","message":"Http failure response for http://localhost:8080/users/1/skills/add: 500 OK","error":{"timestamp":"2018-12-16T16:56:47.098+0000","status":500,"error":"Internal Server Error","message":"could not execute statement; SQL [n/a]; constraint [\"UK_CORMJY41HP853KP6MKWJEV1NV_INDEX_C ON PUBLIC.SKILL_OWNERS(OWNERS_ID) VALUES (1, 1)\"; SQL statement:\ninsert into skill_owners (skill_id, owners_id) values (?, ?) [23505-197]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement","path":"/users/1/skills/add"}}

Ugyanez a második project hozzáadásánál. Az elsőre még működik, a másodikra már elszáll:
ERROR Error: Uncaught (in promise): HttpErrorResponse: {"headers":{"normalizedNames":{},"lazyUpdate":null},"status":500,"statusText":"OK","url":"http://localhost:8080/projects/new","ok":false,"name":"HttpErrorResponse","message":"Http failure response for http://localhost:8080/projects/new: 500 OK","error":{"timestamp":"2018-12-16T17:00:44.501+0000","status":500,"error":"Internal Server Error","message":"could not execute statement; SQL [n/a]; constraint [\"UK_1BY5203W62CBX752R457K8IQQ_INDEX_E ON PUBLIC.PROJECT_MEMBERS(MEMBERS_ID) VALUES (1, 1)\"; SQL statement:\ninsert into project_members (project_id, members_id) values (?, ?) [23505-197]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement","path":"/projects/new"}}
