basePath = "/home/brad/Documents/dnd/a-night-in-huong/npc-art/"
icondir = "icons"

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
    htmlprefix = """<div class="card art-1" style=\"background-image: url("""
    htmlsuffix = """)\" title=""></div>"""

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
    with open(outfilename, "w") as outfile:
        for file in files:
            print(htmlprefix, file, htmlsuffix, sep="", file=outfile)

if __name__ == "__main__":
    main()