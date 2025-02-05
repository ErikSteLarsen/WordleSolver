import tkinter as tk
import WordProcessor
import WordleLogic

class WordleSolver:

    def __init__(self, root):
        self.root = root
        self.root.title("Wordle Solver")
        self.root.resizable(False, False)
        self.current_row = 0
        self.all_words = WordProcessor.return_words_in_file("words.txt")
        self.remaining_words = self.all_words
        self.create_widgets()

    def create_widgets(self):
        self.entry = tk.Entry(self.root, font=("Helvetica", 24))
        self.entry.grid(row=0, column=0, columnspan=5)
        self.submit_button = tk.Button(self.root, text="Submit", command=self.place_guess)
        self.submit_button.grid(row=1, column=0, columnspan=5)
        self.labels = [[tk.Label(self.root, text="", width=4, height=2, font=("Helvetica", 24), borderwidth=2, relief="solid") for _ in range(5)] for _ in range(6)]
        for i in range(6):
            for j in range(5):
                self.labels[i][j].grid(row=i+2, column=j)
                self.labels[i][j].bind("<Button-1>", self.on_label_click)

    def check_guess(self):
        target_word = "APPLE"
        if (len(self.entry.get().lower()) == 5):
            guess = self.entry.get().lower()
            for i, letter in enumerate(guess):
                if letter == target_word[i]:
                    self.labels[self.current_row][i].config(text=letter.upper(), bg="green", fg="white")
                elif letter in target_word:
                    self.labels[self.current_row][i].config(text=letter.upper(), bg="yellow", fg="black")
                else:
                    self.labels[self.current_row][i].config(text=letter.upper(), bg="gray", fg="white")

            self.current_row += 1  # Move to the next row
            self.entry.delete(0, tk.END)  # Clear the entry field
    

    def place_guess(self):
        if (len(self.entry.get().lower()) == 5):
            word = self.entry.get().lower()
            for i, letter in enumerate(word):
                self.labels[self.current_row][i].config(text=letter.upper(), bg="white", fg="black")

            self.current_row += 1
            self.entry.delete(0, tk.END)

    def on_label_click(self, event):
        label = event.widget
        row, col = label.grid_info()["row"], label.grid_info()["column"]
        if (row-1 == self.current_row):
            print(f"Label clicked: {label.cget('text').lower()} at row {row-2}, column {col}")
            self.open_color_modal(label)

    def open_color_modal(self, label):
        modal = tk.Toplevel(self.root)
        modal.title("Select Color")
        modal.geometry("200x100")
        modal.resizable(False, False)

        # Calculate position to center the modal
        main_x = self.root.winfo_x()
        main_y = self.root.winfo_y()
        main_width = self.root.winfo_width()
        main_height = self.root.winfo_height()

        modal_width = 200
        modal_height = 100

        pos_x = main_x + (main_width // 2) - (modal_width // 2)
        pos_y = main_y + (main_height // 2) - (modal_height // 2)

        modal.geometry(f"{modal_width}x{modal_height}+{pos_x}+{pos_y}")

        def set_color(color, prev_color):
            col = label.grid_info()["column"]
            char = label.cget('text').lower()
            self.remaining_words = WordleLogic.test()
            
            print(f"Remaining words: {self.remaining_words}")
            label.config(bg=color)
            modal.destroy()

        green_button = tk.Button(modal, bg="green", text="Green", command=lambda: set_color("green", label.cget("bg")))
        green_button.pack(fill=tk.BOTH, expand=True)

        yellow_button = tk.Button(modal, bg="yellow", text="Yellow", command=lambda: set_color("yellow", label.cget("bg")))
        yellow_button.pack(fill=tk.BOTH, expand=True)

        gray_button = tk.Button(modal, bg="gray", text="Gray", command=lambda: set_color("gray", label.cget("bg")))
        gray_button.pack(fill=tk.BOTH, expand=True)



if __name__ == "__main__":
    root = tk.Tk()
    app = WordleSolver(root)
    root.mainloop()