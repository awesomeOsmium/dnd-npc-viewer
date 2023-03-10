basePath = "/home/brad/Documents/dnd/a-night-in-huong/sessions/"
icondir = "icons"
ignorableDirSubstrings = [
                    ".",
                    "arc",
                    "future",
                    "scripts"
                ]

sizes = {
    "04-absolutum-384.jpg":2,
    "07-abby-full.jpg":3,
    "09-huong-full.png":4,
    "14-quorum-maximum-512.jpg":2,
    "15-prime-minister-doomglory-640.jpg":3,
    "16-prime-minister-seiko-sharpspell-640.jpg":2,
    "23-ser-gail-honeydipper-1216.jpg":2,
    "24-lord-ramsey-bridehead-ix-320.jpg":2,
    "25-ser-axewolf-huntingmour-256.jpg":2,
    "26-lady-trinh-tomogui-640.jpg":2,
    "27-jp-mortal-256.jpg":2,
    "28-lady-arietta-win-512.jpg":2,
    "29-lord-slash-slimegrond-640.jpg":2,
    "30-ser-handless-joe-mildscar-320.jpg":2,
    "35-abbys-kids-640.jpg":2,
    "47-admetus-the-beetus-brutus-704.jpeg":2
}

def replaceDelimiters(target:str, newDelimiter:str="-", delimiters:list=[]):
    for delimiter in delimiters:
        target = target.split(delimiter)
        target = newDelimiter.join(target)
    return target

# Compare strings for similarity. Specifically used to compare them
# to determine whether or not a file is of a specific extension
def stringIsLike(target:str,prefix:str="",suffix:str=""):
    return prefix in target and suffix in target

def doesNotContainAny(target:str,substrings:list=[]):
    for substring in substrings:
        if substring in target:
            return False
    return True

def printHTMLFile(files:list,
                  outfilename:str,
                  htmlPrefix1:str="""<div id=\"art-""",
                  htmlPrefix2:str="""\" class="card art-""",
                  htmlPrefix3:str="""\" style=\"background-image: url(./assets/""",
                  htmlSuffix1:str=""")\" title=\"""",
                  htmlSuffix2:str="""\"></div>""",
                  mode:str="w"):
    # Convert the filenames to html lines & print to file
    lastSize = 1
    with open(outfilename, mode) as outfile:
        for file in files:
            # Compile the filename
            filename = file.split("/")[-1]
            
            # Grab the title from the filename
            # All filenames use hyphens instead of spaces; split the filename into a list of words
            title = filename.split("-")
            # Grab the id while we're at it
            id = title[0]
            try:
                id = int(id)
                id = str(id)
            except Exception as e:
                id = title[0]
            
            # Remove the number from the beginning of the filename
            title = title[1:-1]
            # Convert All Words In Filename To What Is Essentially Pascal Case (Capitalize Each Word)
            title = [word[0].upper() + word[1:] for word in title]
            title = " ".join(title)

            # Set the size based on the filename
            if filename not in sizes.keys():
                size = 1
            else:
                size = sizes[filename]
            if size != lastSize:
                end = "\n\n"
            else:
                end = "\n"
            # print(htmlPrefix1, id, htmlPrefix2, size, htmlPrefix3, filename, htmlSuffix1, title, htmlSuffix2, sep="", end=end, file=outfile)
            print(f"""<div id="art-{id}" class="card" style="background-image: url(./assets/{filename})" title="">
    <span class="tooltiptext">{title}
</span></div>""", end=end, file=outfile)
            lastSize = size
            # Go to next iteration
        # Close the file

def printCopyScript(files:list,
                    outfilename:str,
                    destination:str="./",
                    command:str="cp -v",
                    mode:str="w"):
    header = "#!/bin/bash"
    # Convert the filenames to html lines & print to file
    lastSize = 1
    with open(outfilename, mode) as outfile:
        # Print the header
        print(header, "\n", file=outfile)
        for file in files:
            print(command, " \"", file, "\" \"", destination, "\"", sep="", end="\n", file=outfile)
        print("fortune | cowsay", file=outfile)
        # Close the file

def main():
    from datetime import datetime
    import os

    # Configure html filename & script filename
    now = datetime.now()
    htmlfilename = "./art-files-" + str(now) + ".html"
    scriptfilename = "./art-files-copier-" + str(now) + ".sh"

    # Replace delimiters in filenames
    timeDelimiters = [":", " "]
    htmlfilename = replaceDelimiters(htmlfilename, "-", timeDelimiters)
    scriptfilename = replaceDelimiters(scriptfilename, "-", timeDelimiters)

    # # Get list of directories that are of the format "n-x" where n is an integer such that 0 <= n <= 9, and x is an arbitrary string
    # with os.scandir(basePath) as baseDir:
    #     directories = [os.path.join(basePath, entry) for entry in baseDir if entry.name[0] in '0123456789' and entry.is_dir()]
    # directories.sort()
    # Get list of directories that does not contain "ignorable" substrings
    with os.scandir(basePath) as baseDir:
        directories = [os.path.join(basePath, entry) for entry in baseDir if entry.is_dir() and doesNotContainAny(entry.name, ignorableDirSubstrings)]
    directories.sort()

    # Append "icons/" to each directory
    directories = [os.path.join(dir, icondir) for dir in directories]
    directories.sort()

    print("Found directories:")
    for dir in directories: print(dir)

    files = []

    # Get all icon filenames from each directory
    for dir in directories:
        with os.scandir(dir) as iter:
            for entry in iter:
                if entry.is_file() and (stringIsLike(entry.name,suffix=".jpg") or stringIsLike(entry.name,suffix=".jpeg") or stringIsLike(entry.name,suffix=".png")) and entry.name[0] != ".":
                    files.append(entry.path)
    files.sort()

    # print the HTML file and the script file
    printHTMLFile(files, htmlfilename)
    printCopyScript(files, scriptfilename, "./assets/")

if __name__ == "__main__":
    main()