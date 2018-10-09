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
   * role
   * skills
 * Groups
   * leader
   * name
   * members
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
   * regisztrációs felület
     * *createMember(String name,String password,String role,List<Integer> skills) --a skillek id szerint vannak tárolva*
 * user/edit
   * adatok módosítása
     *modifyUser(String newName, String newPassword)*
   * skillek felvétele
     *addSkills(List<Integer> skills) --a skillek id szerint vannak tárolva*
 * member/tasks
   * feladatok megtekintése
     *getTasks(User user)*
   * feladatok logolása
     *completeTask()*
 * leader/group/create
   * csoport létrehozása
     *createGroup(String groupName,List<User> members)*
 * leader/group/members
   * csoport tagjainak szerkesztése
     *addGroupMember(Group group,User member)*
     *removeGroupMember(Group group, User member)*
 * leader/projects/new
     *createProject(Group group,String name)*
     *createProject(Group group,String name,DateTime deadline)*
 * leader/projects/work
     *createTask(Project projectId, List<Integer> requiredSkills,List<Integer> prerequisites) --az előfeltételek id szerint vannak tárolva*
     *assignTask(Task task,User assignee)*
     *calcOptimalAssignees(Project project)*
     *createSkill(String name, Integer code)*
     *getProjectStatus(Project project)*
 * admin/editusers
   *editUser(String name, String password, String role, List<Integer> skills)*
 
