basePath = "/home/brad/Documents/dnd/a-night-in-huong/npc-art/"
icondir = "icons"

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
    "35-abbys-kids-640.jpg":2
}

# Compare strings for similarity. Specifically used to compare them
# to determine whether or not a file is of a specific extension
def stringIsLike(target:str,prefix:str="",suffix:str=""):
    return prefix in target and suffix in target

def main():
    from datetime import datetime
    import os

    # Configure output file
    outfilename = "./art-files-" + str(datetime.now()) + ".html"
    outfilename = outfilename.split(":")
    outfilename = "-".join(outfilename)
    outfilename = outfilename.split(" ")
    outfilename = "-".join(outfilename)

    # Configufe the HTML prefix & suffix
    htmlprefix1 = """<div class="card art-"""
    htmlprefix2 = """\" style=\"background-image: url(./assets/"""
    htmlsuffix1 = """)\" title=\""""
    htmlsuffix2 = """\"></div>"""

    # Get list of directories that are of the format "n-x" where n is an integer such that 0 <= n <= 9, and x is an arbitrary string
    with os.scandir(basePath) as baseDir:
        directories = [os.path.join(basePath, entry) for entry in baseDir if entry.name[0] in '0123456789' and entry.is_dir()]

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
                if entry.is_file() and \
                    (stringIsLike(entry.name,suffix=".jpg") or stringIsLike(entry.name,suffix=".jpeg") \
                                                            or stringIsLike(entry.name,suffix=".png")) \
                    and entry.name[0] != ".":
                    files.append(entry.path)
    files.sort()
    
    # Convert the filenames to html lines & print to file
    lastSize = 1
    with open(outfilename, "w") as outfile:
        for file in files:
            # Compile the filename
            filename = file.split("/")[-1]
            
            # Grab the title from the filename
            title = filename.split("-")
            title = title[1:-1]
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
            print(htmlprefix1, size, htmlprefix2,\
                  filename,\
                  htmlsuffix1, title, htmlsuffix2,\
                  sep="", end=end, file=outfile)
            lastSize = size
            # Go to next iteration
        # Close the file
    # End of main

if __name__ == "__main__":
    main()